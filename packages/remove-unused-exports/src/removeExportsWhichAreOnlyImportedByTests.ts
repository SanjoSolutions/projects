import type { ParseResult as BabelParseResult } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import type {
  ArgumentPlaceholder,
  CallExpression,
  ExportAllDeclaration,
  ExportDeclaration,
  ExportDefaultDeclaration,
  ExportDefaultSpecifier,
  ExportNamedDeclaration,
  ExportNamespaceSpecifier,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  File as BabelFile,
  Identifier,
  ImportDeclaration,
  JSXNamespacedName,
  SpreadElement,
  Statement,
  StringLiteral,
} from "@babel/types";
import {
  isArrayPattern,
  isArrowFunctionExpression,
  isBlockStatement,
  isCallExpression,
  isClassDeclaration,
  isExportAllDeclaration,
  isExportDeclaration,
  isExportDefaultDeclaration,
  isExportNamedDeclaration,
  isExportNamespaceSpecifier,
  isExportSpecifier,
  isExpressionStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifier,
  isImportDeclaration,
  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  isImportSpecifier,
  isObjectPattern,
  isObjectProperty,
  isRestElement,
  isStringLiteral,
  isVariableDeclaration,
} from "@babel/types";
import { ensureEntryInMap } from "@sanjo/ensure-entry-in-map";
import { removeFile } from "@sanjo/fs";
import { readFile as readFileBase } from "@sanjo/read-file";
import { groupByToMap, isSubset, union } from "@sanjo/set";
import { writeFile as writeFileBase } from "@sanjo/write-file";
import globWithCallback from "glob";
import lodash from "lodash";
import path from "path";
import { parse, print } from "recast";
import type { Overrides } from "recast/parsers/_babel_options.js";
import babelOptions from "recast/parsers/_babel_options.js";
import { parser as baseParser } from "recast/parsers/babel.js";
import { promisify } from "util";

const { partial } = lodash;

let getBabelOptions: any;
if (typeof babelOptions === "function") {
  getBabelOptions = babelOptions;
} else {
  getBabelOptions = (babelOptions as any).default;
}

const glob = promisify(globWithCallback);

type ParseResult = BabelParseResult<BabelFile>;

// TODO: Export all declaration

export async function removeExportsWhichAreOnlyImportedByTests() {
  const filePaths = await glob("**/*.{spec,test}.{js,jsx,ts,tsx}", {
    ignore: "**/node_modules/**/*",
  });
  const files = await readFiles(filePaths);
  const updatedFiles = removeExportsWhichAreOnlyImportedByTests2(files);
  await persistFiles(updatedFiles);
}

async function readFiles(filePaths: string[]): Promise<File[]> {
  return await Promise.all(filePaths.map(readFile));
}

async function readFile(filePath: string): Promise<File> {
  return {
    path: filePath,
    content: await readFileBase(filePath),
  };
}

async function persistFiles(files: OutputFile[]): Promise<void> {
  await Promise.all(files.map(persistFile));
}

async function persistFile(file: OutputFile): Promise<void> {
  if (isFileToDelete(file)) {
    await deleteFile(file);
  } else if (isFileToWrite(file)) {
    await writeFile(file);
  }
}

async function deleteFile(file: FileToDelete): Promise<void> {
  await removeFile(file.path);
}

async function writeFile(file: FileToWrite): Promise<void> {
  await writeFileBase(file.path, file.content);
}

function isFileToDelete(file: OutputFile): file is FileToDelete {
  return file.type === OutputFileType.Delete;
}

function isFileToWrite(file: OutputFile): file is FileToWrite {
  return file.type === OutputFileType.Write;
}

export interface File {
  path: string;
  content: string;
}

export enum OutputFileType {
  Delete = "delete",
  Write = "write",
}

export type OutputFile = FileToDelete | FileToWrite;

interface BaseOutputFile {
  type: OutputFileType;
  path: string;
}

interface FileToDelete extends BaseOutputFile {
  type: OutputFileType.Delete;
}

export interface FileToWrite extends BaseOutputFile {
  type: OutputFileType.Write;
  content: string;
}

export function removeExportsWhichAreOnlyImportedByTests2(
  files: File[]
): OutputFile[] {
  const parsedFiles = parseFiles(files);
  const importsAndExports = findImportsAndExportsOfFiles(parsedFiles);
  const exportsWhichAreOnlyImportedByTests = findExportsWhichAreOnlyImportedByTests(
    importsAndExports
  );
  const updatedFiles = removeExports(
    parsedFiles,
    exportsWhichAreOnlyImportedByTests
  );
  return updatedFiles;
}

type FilePath = string;

interface ParsedFile {
  path: FilePath;
  ast: ParseResult;
}

enum ImportOrExportType {
  Import,
  Export,
}

interface Import {
  type: ImportOrExportType.Import;
  filePath: FilePath;
  statement: ImportDeclaration;
}

// TODO: Handling of aggregated import (regarding tracking the import)
interface ImportWithWhatSymbolIsImported extends Import {
  name: string;
  isImportingTheDefaultImport: boolean; // true for default import and false for other imports
}

type Export = DefaultExport | NamedExport;

interface BaseExport {
  type: ImportOrExportType.Export;
  filePath: FilePath;
  statement: ExportDeclaration;
  isDefaultExport: boolean;
  usedBy: Import[];
}

interface DefaultExport extends BaseExport {
  statement: ExportDefaultDeclaration;
  isDefaultExport: true;
}

interface NamedExport extends BaseExport {
  statement: ExportNamedDeclaration | ExportAllDeclaration;
  isDefaultExport: false;
  name: string;
}

interface ImportsAndExports {
  imports: Import[];
  exports: Export[];
}

type ThingToRemove = Export | ImportWithWhatSymbolIsImported;

function parseFiles(files: File[]): ParsedFile[] {
  return files.map(parseFile);
}

const parser = {
  parse(source: string, options: Overrides): ParseResult {
    const babelOptions = getBabelOptions(options);
    babelOptions.plugins.push("typescript");
    babelOptions.plugins.push("jsx");
    return baseParser.parse(source, babelOptions);
  },
};

function parseFile(file: File): ParsedFile {
  try {
    const ast = parse(file.content, {
      parser,
    }) as ParseResult;
    return {
      path: file.path,
      ast,
    };
  } catch (error: any) {
    console.error("Error while trying to parse file: " + file.path);
    throw error;
  }
}

function findImportsAndExportsOfFiles(
  parsedFiles: ParsedFile[]
): ImportsAndExports {
  const importsAndExports = parsedFiles.map(findImportsAndExports);
  return {
    imports: importsAndExports.flatMap(({ imports }) => imports),
    exports: importsAndExports.flatMap(({ exports }) => exports),
  };
}

function findImportsAndExports(parsedFile: ParsedFile): ImportsAndExports {
  return {
    imports: findImports(parsedFile),
    exports: findExports(parsedFile),
  };
}

function findImports(parsedFile: ParsedFile): Import[] {
  // TODO: dynamic imports (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)

  const importDeclarations = retrieveBody(
    parsedFile
  ).filter((statement): statement is ImportDeclaration =>
    isImportDeclaration(statement)
  );

  return importDeclarations.map(partial(createImport, parsedFile.path));
}

function createImport(
  filePath: FilePath,
  statement: ImportDeclaration
): Import {
  return {
    type: ImportOrExportType.Import,
    filePath,
    statement,
  };
}

function findExports(parsedFile: ParsedFile): Export[] {
  const exportDeclarations = retrieveBody(parsedFile).filter(
    isExportNamedDeclarationOrExportDefaultDeclaration
  );

  return exportDeclarations.flatMap(partial(createExports, parsedFile.path));
}

function isExportNamedDeclarationOrExportDefaultDeclaration(
  statement: Statement
): statement is ExportNamedDeclaration | ExportDefaultDeclaration {
  return (
    isExportNamedDeclaration(statement) || isExportDefaultDeclaration(statement)
  );
}

function createExports(
  filePath: FilePath,
  statement: ExportDefaultDeclaration | ExportNamedDeclaration
): Export[] {
  if (isExportDefaultDeclaration(statement)) {
    return createExportsForExportDefaultDeclaration(filePath, statement);
  } else if (isExportNamedDeclaration(statement)) {
    return createExportsForExportNamedDeclaration(filePath, statement);
  } else {
    throw new Error("Unexpected case");
  }
}

function createExportsForExportDefaultDeclaration(
  filePath: FilePath,
  statement: ExportDefaultDeclaration
): DefaultExport[] {
  return [createDefaultExport(filePath, statement)];
}

function createDefaultExport(
  filePath: FilePath,
  statement: ExportDefaultDeclaration
): DefaultExport {
  return {
    type: ImportOrExportType.Export,
    filePath,
    statement,
    usedBy: [],
    isDefaultExport: true,
  };
}

export function createExportsForExportNamedDeclaration(
  filePath: FilePath,
  statement: ExportNamedDeclaration | ExportAllDeclaration
): Export[] {
  const result = [
    createNamedExport(filePath, "export1", statement),
    createNamedExport(filePath, "export2", statement),
  ];
  if (isReExport(statement)) {
    if (isExportAllDeclaration(statement)) {
      return result;
    } else if (isExportNamedDeclaration(statement)) {
      const result = [];
      for (const specifier of statement.specifiers) {
        if (isExportNamespaceSpecifier(specifier)) {
          return [createNamedExport(filePath, "exports", statement)];
        } else if (isExportSpecifier(specifier)) {
          result.push(
            createNamedExport(
              filePath,
              retrieveName(specifier.exported),
              statement
            )
          );
        }
      }
      return result;
    } else {
      throw new Error("Unhandled case");
    }
  } else {
    if (isExportNamedDeclaration(statement)) {
      if (statement.declaration) {
        if (isVariableDeclaration(statement.declaration)) {
          return statement.declaration.declarations
            .flatMap((declarator) => {
              if (isIdentifier(declarator.id)) {
                return createNamedExport(
                  filePath,
                  (declarator.id as Identifier).name,
                  statement
                );
              } else if (isObjectPattern(declarator.id)) {
                return declarator.id.properties.flatMap((property) => {
                  if (isObjectProperty(property)) {
                    if (isIdentifier(property.value)) {
                      return createNamedExport(
                        filePath,
                        property.value.name,
                        statement
                      );
                    } else if (isArrayPattern(property.value)) {
                      return property.value.elements.map((element) => {
                        if (isIdentifier(element)) {
                          return createNamedExport(
                            filePath,
                            element.name,
                            statement
                          );
                        } else {
                          // TODO: Handle other types that element can have.
                          return null;
                        }
                      });
                    }
                  } else if (isRestElement(property)) {
                    if (isIdentifier(property.argument)) {
                      return createNamedExport(
                        filePath,
                        property.argument.name,
                        statement
                      );
                    } else {
                      // TODO: Handle other types of LVal
                    }
                  } else {
                    return null;
                  }
                });
              } else if (isArrayPattern(declarator.id)) {
                // TODO: Handle other cases of PatternLike
                return declarator.id.elements
                  .filter((element) => element && isIdentifier(element))
                  .map((element) =>
                    createNamedExport(
                      filePath,
                      (element as Identifier).name,
                      statement
                    )
                  );
              } else {
                return [];
              }
            })
            .filter((value): value is NamedExport => Boolean(value));
        } else if (isFunctionDeclaration(statement.declaration)) {
          if (isIdentifier(statement.declaration.id)) {
            return [
              createNamedExport(
                filePath,
                statement.declaration.id.name,
                statement
              ),
            ];
          } else {
            return [];
          }
        }
      }
    }

    return [
      createNamedExport(filePath, "export1", statement),
      createNamedExport(filePath, "export2", statement),
    ];
  }
  return [];
}

function isReExport(statement: ExportDeclaration): boolean {
  return (
    isExportAllDeclaration(statement) ||
    (isExportNamedDeclaration(statement) && statement.source !== null)
  );
}

export function createNamedExport(
  filePath: FilePath,
  name: string,
  statement: ExportNamedDeclaration | ExportAllDeclaration
): NamedExport {
  return {
    type: ImportOrExportType.Export,
    filePath,
    statement,
    isDefaultExport: false,
    usedBy: [],
    name,
  };
}

function retrieveBody(parsedFile: ParsedFile): Statement[] {
  return parsedFile.ast.program.body;
}

function findExportsWhichAreOnlyImportedByTests(
  importsAndExports: ImportsAndExports
): Export[] {
  const { imports, exports } = importsAndExports;
  const testImports = new Set(findTestImports(imports));
  const exportsWhichAreOnlyImportedByTestsWithImports = [];
  for (const anExport of exports) {
    const importsOfExport = findImportsOfExport(imports, anExport);
    if (areAllImportsTestImports(importsOfExport, testImports)) {
      exportsWhichAreOnlyImportedByTestsWithImports.push(
        createExportWithUsedBy(anExport, importsOfExport)
      );
    }
  }
  return exportsWhichAreOnlyImportedByTestsWithImports;
}

function findTestImports(imports: Import[]): Import[] {
  return imports.filter(isTestImport);
}

const testFilePathRegExp = /\.(?:spec|test)\.[jt]sx?$/;

function isTestImport(anImport: Import): boolean {
  const { filePath } = anImport;
  return testFilePathRegExp.test(filePath);
}
function findImportsOfExport(imports: Import[], anExport: Export): Import[] {
  return imports.filter(partial(isImportingExport, anExport));
}

function areAllImportsTestImports(
  imports: Import[],
  testImports: Set<Import>
): boolean {
  return areAllInSet(imports, testImports);
}

function areAllInSet(
  importsOfExport: Import[],
  testImports: Set<Import>
): boolean {
  return isSubset(importsOfExport, testImports);
}

function createExportWithUsedBy(
  anExport: Export,
  importsOfExport: Import[]
): Export {
  return {
    ...anExport,
    usedBy: importsOfExport,
  };
}

function isImportingExport(anExport: Export, anImport: Import): boolean {
  return (
    isImportingDefaultExport(anExport, anImport) ||
    isImportingNamedExport(anExport, anImport)
  );
}

function isImportingDefaultExport(anExport: Export, anImport: Import): boolean {
  return (
    isExportDefaultDeclaration(anExport.statement) &&
    anImport.statement.specifiers.some(
      (specifier) =>
        isImportDefaultSpecifier(specifier) ||
        isImportNamespaceSpecifier(specifier)
    ) &&
    convertToAbsolutePath(
      anImport.filePath,
      anImport.statement.source.value
    ) === anExport.filePath
  );
}

function isImportingNamedExport(anExport: Export, anImport: Import): boolean {
  return (
    anImport.statement.specifiers.some(
      (specifier) =>
        isImportSpecifier(specifier) &&
        isExportingName(anExport.statement, retrieveName(specifier.imported))
    ) &&
    convertToAbsolutePath(
      anImport.filePath,
      anImport.statement.source.value
    ) === anExport.filePath
  );
}

export function convertToAbsolutePath(
  filePath: FilePath,
  importPath: FilePath
): FilePath {
  return path.resolve(path.dirname(filePath), importPath);
}

export function isExportingName(
  anExport: ExportDeclaration,
  name: string
): boolean {
  return (
    isVariableDeclarationThatIsExportingName(anExport, name) ||
    isFunctionDeclarationThatIsExportingName(anExport, name) ||
    isClassDeclarationThatIsExportingName(anExport, name) ||
    isExportingNameDirectly(anExport, name)
  );
}

export function isVariableDeclarationThatIsExportingName(
  anExport: ExportDeclaration,
  name: string
): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isVariableDeclaration(anExport.declaration) &&
    anExport.declaration.declarations.some(
      (declarator) => isIdentifier(declarator.id) && declarator.id.name === name
    )
  );
}

export function isFunctionDeclarationThatIsExportingName(
  anExport: ExportDeclaration,
  name: string
): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isFunctionDeclaration(anExport.declaration) &&
    anExport.declaration.id?.name === name
  );
}

export function isClassDeclarationThatIsExportingName(
  anExport: ExportDeclaration,
  name: string
): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    isClassDeclaration(anExport.declaration) &&
    anExport.declaration.id?.name === name
  );
}

// TODO: Case: reexporting

export function isExportingNameDirectly(
  anExport: ExportDeclaration,
  name: string
): boolean {
  return (
    isExportNamedDeclaration(anExport) &&
    anExport?.specifiers.some(partial(isSpecifierExportingName, name))
  );
}

export function isSpecifierExportingName(
  name: string,
  specifier: ExportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier
): boolean {
  if (isExportSpecifier(specifier)) {
    const { exported } = specifier;
    return retrieveName(exported) === name;
  }
  return false;
}

function retrieveName(node: Identifier | StringLiteral): string {
  if (isIdentifier(node)) {
    return node.name;
  } else if (isStringLiteral(node)) {
    return node.value;
  } else {
    throw new Error("Unexpected node");
  }
}

type ThingsToRemove = Set<ThingToRemove>;

interface ThingsToRemoveInFileJob {
  path: FilePath;
  thingsToRemove: ThingsToRemove;
  ast: ParseResult;
}

function removeExports(
  parsedFiles: ParsedFile[],
  exportsToRemove: Export[]
): OutputFile[] {
  const parsedFilesLookup = generateParsedFilesLookup(parsedFiles);
  const exportsToRemoveGroupedByFile = groupExportsToRemoveByFile(
    exportsToRemove
  );
  const importsToRemove = exportsToRemove.flatMap((anExport) =>
    anExport.usedBy.map<ImportWithWhatSymbolIsImported>((anImport) => {
      return {
        ...anImport,
        name: findLocalNameOfImport(anImport, anExport),
        isImportingTheDefaultImport: anExport.isDefaultExport,
      };
    })
  );
  const importsToRemoveGroupedByFile = groupImportsToRemoveByFile(
    importsToRemove
  );
  const thingsToRemoveGroupedByFile = mergeMaps<FilePath, ThingToRemove>(
    exportsToRemoveGroupedByFile,
    importsToRemoveGroupedByFile
  );
  const jobs = Array.from(thingsToRemoveGroupedByFile.entries()).map(
    ([filePath, thingsToRemove]) => {
      return createThingsToRemoveInFileJob(
        filePath,
        thingsToRemove,
        parsedFilesLookup.get(filePath)!.ast
      );
    }
  );
  return Array.from(removeThingsInFiles(jobs));
}

function findLocalNameOfImport(anImport: Import, anExport: Export): string {
  const specifierOfImport = anImport.statement.specifiers.find((specifier) => {
    if (isImportNamespaceSpecifier(specifier)) {
      return true;
    } else {
      if (anExport.isDefaultExport) {
        if (isImportDefaultSpecifier(specifier)) {
          return true;
        }
      } else if (isImportSpecifier(specifier)) {
        return retrieveName(specifier.imported) === anExport.name;
      }
    }
  });
  if (specifierOfImport) {
    const localName = specifierOfImport.local.name;
    return localName;
  } else {
    throw new Error("Couldn't find specifier for import of export.");
  }
}

function createThingsToRemoveInFileJob(
  path: string,
  thingsToRemove: ThingsToRemove,
  ast: ParseResult
): ThingsToRemoveInFileJob {
  return {
    path,
    thingsToRemove,
    ast,
  };
}

function mergeMaps<Key, Value>(
  ...maps: Map<Key, Set<Value>>[]
): Map<Key, Set<Value>> {
  const result = new Map<Key, Set<Value>>();
  for (const map of maps) {
    for (const [key, value] of map) {
      ensureEntryInMap(result, key, () => new Set());
      const set = result.get(key)!;
      result.set(key, union(set, value));
    }
  }
  return result;
}

function* removeThingsInFiles(
  thingsToRemoveInFileJobs: ThingsToRemoveInFileJob[]
): Generator<OutputFile> {
  for (const job of thingsToRemoveInFileJobs) {
    yield removeThingsInFile(job);
  }
}

function removeThingsInFile(job: ThingsToRemoveInFileJob): OutputFile {
  const { path: filePath, thingsToRemove, ast } = job;

  const importsToRemove = Array.from(thingsToRemove).filter(
    isImportWithWhatSymbolIsImported
  );

  const localNamesThatAreRemoved = importsToRemove.flatMap((importToRemove) => {
    return importToRemove.name;
  });

  traverse(ast, {
    ExpressionStatement(path) {
      if (seemsToBeTestForSomeOfTheSymbols(localNamesThatAreRemoved, path)) {
        path.remove();
      }
    },
  });

  traverse(ast, {
    ExpressionStatement(path) {
      if (
        seemsToBeEmptyDescribeBlockForSomeTheSymbols(
          localNamesThatAreRemoved,
          path
        )
      ) {
        path.remove();
      }
    },
  });

  updateImportAndExportStatements(ast, thingsToRemove);

  const content = print(ast, {
    lineTerminator: "\n",
  }).code;
  let file: OutputFile;
  if (content.trim() === "") {
    file = {
      type: OutputFileType.Delete,
      path: filePath,
    };
  } else {
    file = {
      type: OutputFileType.Write,
      path: filePath,
      content,
    };
  }
  return file;
}

function updateImportAndExportStatements(
  ast: ParseResult,
  thingToRemove: ThingsToRemove
): void {
  const thingsToRemoveArray = Array.from(thingToRemove);
  const updatedStatements = [];
  for (const statement of ast.program.body) {
    const relevantThingsToRemove = thingsToRemoveArray.filter(
      (thingsToRemove) => thingsToRemove.statement === statement
    );
    if (isExportDeclaration(statement)) {
      const exportsToRemove = relevantThingsToRemove.filter((thingsToRemove) =>
        isExport(thingsToRemove)
      ) as Export[];
      if (isExportNamedDeclaration(statement)) {
        function isNamedExportToRemove(name: string): boolean {
          return exportsToRemove.some(
            (anExport) => !anExport.isDefaultExport && name === anExport.name
          );
        }

        if (isVariableDeclaration(statement.declaration)) {
          statement.declaration.declarations = statement.declaration.declarations.filter(
            (declarator) => {
              if (isIdentifier(declarator.id)) {
                return isNamedExportToRemove(declarator.id.name);
              } else {
                throw new Error("Unhandled case");
              }
            }
          );
          if (statement.declaration.declarations.length >= 1) {
            updatedStatements.push(statement);
          }
        } else if (statement.declaration) {
          const exportedName = ((statement.declaration as any)
            ?.id as Identifier).name;
          if (exportedName && isNamedExportToRemove(exportedName)) {
          } else {
            updatedStatements.push(statement);
          }
          console.log("");
        } else if (statement.specifiers?.length >= 1) {
          statement.specifiers = statement.specifiers.filter((specifier) =>
            isNamedExportToRemove(retrieveName(specifier.exported))
          );
          if (statement.specifiers.length >= 1) {
            updatedStatements.push(statement);
          }
        } else {
          throw new Error("Unhandled case");
        }
      } else if (isExportDefaultDeclaration(statement)) {
        if (none(exportsToRemove, (anExport) => anExport.isDefaultExport)) {
          updatedStatements.push(statement);
        }
      } else if (isExportAllDeclaration(statement)) {
        // TODO
        throw new Error("Not implemented");
      } else {
        throw new Error("Unhandled case");
      }
    } else if (isImportDeclaration(statement)) {
      const importsToRemove = relevantThingsToRemove.filter((thingsToRemove) =>
        isImportWithWhatSymbolIsImported(thingsToRemove)
      ) as ImportWithWhatSymbolIsImported[];
      statement.specifiers = statement.specifiers.filter((specifier) => {
        if (isImportDefaultSpecifier(specifier)) {
          return none(
            importsToRemove,
            (anImport) => specifier.local.name === anImport.name
          );
        } else if (isImportSpecifier(specifier)) {
          return none(
            importsToRemove,
            (anImport) => specifier.local.name === anImport.name
          );
        } else if (isImportNamespaceSpecifier(specifier)) {
          return none(
            importsToRemove,
            (anImport) => specifier.local.name === anImport.name
          );
        }
      });
      if (statement.specifiers.length >= 1) {
        updatedStatements.push(statement);
      }
    } else {
      updatedStatements.push(statement);
    }
  }
  ast.program.body = updatedStatements;
}

function none<T>(array: T[], predicate: (element: T) => boolean): boolean {
  return !array.some(predicate);
}

function isImportWithWhatSymbolIsImported(
  thing: ThingToRemove
): thing is ImportWithWhatSymbolIsImported {
  return thing.type === ImportOrExportType.Import;
}

function isExport(thing: ThingToRemove): thing is Export {
  return thing.type === ImportOrExportType.Export;
}

function seemsToBeTestForSomeOfTheSymbols(
  symbolNames: string[],
  path: NodePath<ExpressionStatement>
): boolean {
  return symbolNames.some(partial(seemsToBeTestForSymbol, path));
}

function seemsToBeTestForSymbol(
  path: NodePath<ExpressionStatement>,
  name: string
): boolean {
  return (
    (isCallExpressionWithName(path.node, "it") ||
      isCallExpressionWithName(path.node, "test")) &&
    Boolean(
      path.findParent(
        (path) =>
          isExpressionStatement(path.node) &&
          seemsToBeDescribeBlockForSymbol(
            path as NodePath<ExpressionStatement>,
            name
          )
      )
    ) &&
    doesExpressionStatementContainSymbolUsage(path, name)
  );
}

function seemsToBeEmptyDescribeBlockForSomeTheSymbols(
  symbolNames: string[],
  path: NodePath<ExpressionStatement>
): boolean {
  return symbolNames.some(partial(seemsToBeEmptyDescribeBlockForSymbol, path));
}

export function seemsToBeEmptyDescribeBlockForSymbol(
  path: NodePath<ExpressionStatement>,
  name: string
): boolean {
  const a = seemsToBeDescribeBlockForSymbol(path, name);
  const b = isEmptyFunction(
    (path.node.expression as CallExpression).arguments[1]
  );
  if (a) {
    console.log("");
  }
  return a && b;
}

function isEmptyFunction(statement: any): boolean {
  return (
    (isFunctionExpression(statement) || isArrowFunctionExpression(statement)) &&
    isBlockStatement(statement.body) &&
    statement.body.body.length === 0
  );
}

function seemsToBeDescribeBlockForSymbol(
  path: NodePath<ExpressionStatement>,
  name: string
): boolean {
  return (
    isCallExpressionWithName(path.node, "describe") &&
    isArgumentWithString(
      (path.node.expression as CallExpression).arguments[0],
      name
    )
  );
}

function isArgumentWithString(
  argument:
    | Expression
    | SpreadElement
    | JSXNamespacedName
    | ArgumentPlaceholder,
  string: string
): boolean {
  return isStringLiteral(argument) && argument.value === string;
}

function isCallExpressionWithName(node: any, name: string): boolean {
  return (
    isCallExpression(node.expression) &&
    isIdentifier(node.expression.callee) &&
    node.expression.callee.name === name
  );
}

function doesExpressionStatementContainSymbolUsage(
  path: NodePath<ExpressionStatement>,
  name: string
): boolean {
  let doesContainSymbolUsage = false;
  path.traverse({
    Identifier(path) {
      if (name === path.node.name) {
        doesContainSymbolUsage = true;
        path.stop();
      }
    },
  });
  return doesContainSymbolUsage;
}

function generateParsedFilesLookup(
  parsedFiles: ParsedFile[]
): Map<FilePath, ParsedFile> {
  return new Map<FilePath, ParsedFile>(
    parsedFiles.map((parsedFile) => [parsedFile.path, parsedFile])
  );
}

function groupExportsToRemoveByFile(
  exportsToRemove: Export[]
): Map<FilePath, Set<Export>> {
  return groupByToMap(new Set(exportsToRemove), retrieveFilePath);
}

function groupImportsToRemoveByFile(
  importsToRemove: ImportWithWhatSymbolIsImported[]
): Map<FilePath, Set<ImportWithWhatSymbolIsImported>> {
  return groupByToMap(new Set(importsToRemove), retrieveFilePath);
}

function retrieveFilePath(thing: { filePath: string }): string {
  return thing.filePath;
}
