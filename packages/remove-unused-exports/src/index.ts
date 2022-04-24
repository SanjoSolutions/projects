import {
  Identifier,
  isClassDeclaration,
  isDeclareClass,
  isDeclareFunction,
  isDeclareInterface,
  isDeclareOpaqueType,
  isDeclareTypeAlias,
  isDeclareVariable,
  isEnumDeclaration,
  isExportNamedDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isInterfaceDeclaration,
  isOpaqueType,
  isTSDeclareFunction,
  isTSEnumDeclaration,
  isTSInterfaceDeclaration,
  isTSTypeAliasDeclaration,
  isTypeAlias,
  isVariableDeclaration,
} from '@babel/types'
import { readFile } from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'
import groupBy from 'lodash.groupby'
import { parse, print } from 'recast'
import babelOptions, { Overrides } from 'recast/parsers/_babel_options.js'
const { default: getBabelOptions } = babelOptions as any
import { getConfig } from 'ts-prune/lib/configurator.js'
import { run } from 'ts-prune/lib/runner.js'
import { parser as baseParser } from 'recast/parsers/babel.js'

const parser = {
  parse(source: string, options: Overrides) {
    const babelOptions = getBabelOptions(options)
    babelOptions.plugins.push('typescript')
    babelOptions.plugins.push('jsx')
    return baseParser.parse(source, babelOptions)
  },
}

export async function removeExports() {
  const config = getConfig()
  const output: string[] = []

  function captureOutput(string: string) {
    output.push(string)
  }

  run(config, captureOutput)
  await removeExportsFromOutput(output)
}

async function removeExportsFromOutput(output: string[]) {
  // TODO: Also handle default exports

  const entries = parseOutput(output)
  const groups = groupByFilePath(entries)

  for (const [filePath, entries] of groups) {
    try {
      const ast = parse(await readFile(filePath), {
        parser,
      })

      const symbolNamesToRemove = entries.map(({ symbolName }) => symbolName)

      function isIdentifierWhichMatchesASymbolNameToRemove(identifier: Identifier): boolean {
        const symbolName = identifier.name
        return Boolean(symbolName && symbolNamesToRemove.includes(symbolName))
      }

      for (const node of ast.program.body) {
        if (isExportNamedDeclaration(node)) {
          if (node.declaration) {
            const { declaration } = node
            if (
              isFunctionDeclaration(declaration) ||
              isClassDeclaration(declaration) ||
              isDeclareClass(declaration) ||
              isDeclareFunction(declaration) ||
              isDeclareInterface(declaration) ||
              isDeclareTypeAlias(declaration) ||
              isDeclareOpaqueType(declaration) ||
              isDeclareVariable(declaration) ||
              isInterfaceDeclaration(declaration) ||
              isOpaqueType(declaration) ||
              isTypeAlias(declaration) ||
              isEnumDeclaration(declaration) ||
              isTSDeclareFunction(declaration) ||
              isTSInterfaceDeclaration(declaration) ||
              isTSTypeAliasDeclaration(declaration) ||
              isTSEnumDeclaration(declaration)
            ) {
              const identifier = declaration.id
              if (identifier && isIdentifierWhichMatchesASymbolNameToRemove(identifier)) {
                remove(ast.program.body, node)
              }
            } else if (isVariableDeclaration(declaration)) {
              for (const declaration2 of declaration.declarations) {
                if (isIdentifier(declaration2.id) && isIdentifierWhichMatchesASymbolNameToRemove(declaration2.id)) {
                  remove(declaration.declarations, declaration2)
                }
              }
              if (declaration.declarations.length === 0) {
                remove(ast.program.body, node)
              }
            }
          }
        }
      }

      await writeFile(filePath, print(ast).code)
    } catch (error: any) {
      console.error('File path: ' + filePath)
      throw error
    }
  }
}

function remove(array: any[], entry: any) {
  const index = array.indexOf(entry)
  if (index !== -1) {
    array.splice(index, 1)
  }
}

type FilePath = string

interface Entry {
  filePath: FilePath
  line: number
  symbolName: string
  isUsedInModule: boolean
}

function parseOutput(output: string[]): Entry[] {
  return output.map(parseEntry)
}

const regExp = /(.+):(\d+) - (.+)(?: \(used in module\))?/

function parseEntry(entry: string): Entry {
  const match = regExp.exec(entry)
  if (match) {
    return {
      filePath: match[1],
      line: parseInt(match[2], 10),
      symbolName: match[3],
      isUsedInModule: Boolean(match[4]),
    }
  } else {
    throw new Error(`Error while parsing entry: "${entry}"`)
  }
}

function groupByFilePath(entries: Entry[]): Map<FilePath, Entry[]> {
  return new Map(Object.entries(groupBy(entries, 'filePath')))
}
