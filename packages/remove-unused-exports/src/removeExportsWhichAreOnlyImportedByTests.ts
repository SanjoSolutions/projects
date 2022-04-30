import type { ParseResult } from '@babel/parser'
import type {
  ExportDeclaration,
  ExportDefaultDeclaration,
  ExportDefaultSpecifier,
  ExportNamedDeclaration,
  ExportNamespaceSpecifier,
  ExportSpecifier,
  File,
  ImportDeclaration,
  Statement,
} from '@babel/types'
import {
  isClassDeclaration,
  isExportDefaultDeclaration,
  isExportNamedDeclaration,
  isExportSpecifier,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  isStringLiteral,
  isVariableDeclaration,
} from '@babel/types'
import { readFile } from '@sanjo/read-file'
import { isSubset } from '@sanjo/set'
import partial from 'lodash.partial'
import path from 'path/posix'
import { parse } from 'recast'
import type { Overrides } from 'recast/parsers/_babel_options.js'
import getBabelOptions from 'recast/parsers/_babel_options.js'
import { parser as baseParser } from 'recast/parsers/babel.js'

// TODO: Export all declaration

export async function removeExportsWhichAreOnlyImportedByTests(filePaths: FilePath[]) {
  const parsedFiles = await parseFiles(filePaths)
  const importsAndExports = findImportsAndExportsOfFiles(parsedFiles)
  const exportsWhichAreOnlyImportedByTests = findExportsWhichAreOnlyImportedByTests(importsAndExports)
  await removeExports(parsedFiles, exportsWhichAreOnlyImportedByTests)
}

type FilePath = string

interface ParsedFile {
  filePath: FilePath
  ast: ParseResult<File>
}

enum ImportOrExportType {
  Import, Export
}

interface Import {
  filePath: FilePath
  statement: ImportDeclaration
}

interface Export {
  filePath: FilePath
  statement: ExportDefaultDeclaration | ExportNamedDeclaration
}

interface ImportsAndExports {
  imports: Import[]
  exports: Export[]
}

async function parseFiles(filePaths: FilePath[]): Promise<ParsedFile[]> {
  return await Promise.all(filePaths.map(parseFile))
}

const parser = {
  parse(source: string, options: Overrides): ParseResult<File> {
    const babelOptions = getBabelOptions(options)
    babelOptions.plugins.push('typescript')
    babelOptions.plugins.push('jsx')
    return baseParser.parse(source, babelOptions)
  },
}

async function parseFile(filePath: FilePath): Promise<ParsedFile> {
  const ast = parse(await readFile(filePath), {
    parser,
  }) as ParseResult<File>
  return {
    filePath, ast,
  }
}

function findImportsAndExportsOfFiles(parsedFiles: ParsedFile[]): ImportsAndExports {
  const importsAndExports = parsedFiles.map(findImportsAndExports)
  return {
    imports: importsAndExports.flatMap(({ imports }) => imports),
    exports: importsAndExports.flatMap(({ exports }) => exports),
  }
}

function findImportsAndExports(parsedFile: ParsedFile): ImportsAndExports {
  return {
    imports: findImports(parsedFile), exports: findExports(parsedFile),
  }
}

function findImports(parsedFile: ParsedFile): Import[] {
  // TODO: dynamic imports (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)

  const importDeclarations = retrieveBody(parsedFile).filter(isImportDeclaration)

  return importDeclarations.map(partial(createImport, parsedFile.filePath))
}

function createImport(filePath: FilePath, statement: ImportDeclaration): Import {
  return {
    filePath, statement,
  }
}

function findExports(parsedFile: ParsedFile): Export[] {
  const exportDeclarations = retrieveBody(parsedFile).filter(isExportNamedDeclarationOrExportDefaultDeclaration)

  return exportDeclarations.map(partial(createExport, parsedFile.filePath))
}

function isExportNamedDeclarationOrExportDefaultDeclaration(statement: Statement): statement is (ExportNamedDeclaration | ExportDefaultDeclaration) {
  return isExportNamedDeclaration(statement) || isExportDefaultDeclaration(statement)
}

function createExport(filePath: FilePath, statement: ExportDefaultDeclaration | ExportNamedDeclaration): Export {
  return {
    filePath, statement,
  }
}

function retrieveBody(parsedFile: ParsedFile): Statement[] {
  return parsedFile.ast.program.body
}

function findExportsWhichAreOnlyImportedByTests(importsAndExports: ImportsAndExports): Export[] {
  const { imports, exports } = importsAndExports
  const testImports = new Set(findTestImports(imports))
  return exports.filter(partial(isExportThatIsOnlyImportedByTests, imports, testImports))
}

function findTestImports(imports: Import[]): Import[] {
  // TODO: Implement
}

function isExportThatIsOnlyImportedByTests(imports: Import[], testImports: Set<Import>, anExport: Export): boolean {
  const importsOfExport = imports.filter(partial(isImportingExport, anExport))
  return areAllInSet(importsOfExport, testImports)
}

function areAllInSet(importsOfExport: Import[], testImports: Set<Import>): boolean {
  return isSubset(importsOfExport, testImports)
}

function isImportingExport(anExport: Export, anImport: Import): boolean {
  return (
    isImportingDefaultExport(anExport, anImport) || isImportingNamedExport(anExport, anImport)
  )
}

function isImportingDefaultExport(anExport: Export, anImport: Import): boolean {
  return (
    isExportDefaultDeclaration(anExport) &&
    anImport.statement.specifiers.some(specifier => (
      isImportDefaultSpecifier(specifier) || isImportNamespaceSpecifier(specifier)
    )) &&
    convertToAbsolutePath(anImport.filePath, anImport.statement.source.value) ===
    anExport.filePath
  )
}

function isImportingNamedExport(anExport: Export, anImport: Import): boolean {
  return (
    anImport.statement.specifiers.some(
      specifier => isExportingName(anExport.statement, specifier.imported.name)
    ) &&
    convertToAbsolutePath(anImport.filePath, anImport.statement.source.value) === anExport.filePath
  )
}

export function convertToAbsolutePath(filePath: FilePath, importPath: FilePath): FilePath {
  return path.resolve(filePath, importPath)
}

export function isExportingName(anExport: ExportDeclaration, name: string): boolean {
  return (
    isVariableDeclarationThatIsExportingName(anExport, name) ||
    isFunctionDeclarationThatIsExportingName(anExport, name) ||
    isClassDeclarationThatIsExportingName(anExport, name) ||
    isExportingNameDirectly(anExport, name)
  )
}

export function isVariableDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isVariableDeclaration(anExport.declaration) &&
    anExport.declaration.declarations.some(declarator => isIdentifier(declarator.id) && declarator.id.name === name)
  )
}

export function isFunctionDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isFunctionDeclaration(anExport.declaration) &&
    anExport.declaration.id?.name ===
    name
  )
}

export function isClassDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isClassDeclaration(anExport.declaration) &&
    anExport.declaration.id?.name ===
    name
  )
}

// TODO: Case: reexporting

export function isExportingNameDirectly(anExport: ExportDeclaration, name: string): boolean {
  return (
    isExportNamedDeclaration(anExport) && anExport?.specifiers.some(partial(isSpecifierExportingName, name))
  )
}

export function isSpecifierExportingName(name: string,
  specifier: ExportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier,
): boolean {
  if (isExportSpecifier(specifier)) {
    const { exported } = specifier
    return (
      (
        isIdentifier(exported) && exported.name === name
      ) ||
      (
        isStringLiteral(exported) && exported.value === name
      )
    )
  }
  return false
}

async function removeExports(parsedFiles: ParsedFile[], exportsToRemove: Export[]): Promise<void> {

}
