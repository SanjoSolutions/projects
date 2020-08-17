import traverse from '@babel/traverse'
import {
  cloneNode,
  exportNamedDeclaration,
  file,
  identifier,
  importDeclaration,
  importSpecifier,
  program,
  stringLiteral,
} from '@babel/types'
import * as recast from 'recast'
import * as babelParser from 'recast/parsers/babel.js'

export function extractFunctions (inputFile, functionNamesToExtract) {
  if (typeof functionNamesToExtract === 'string') {
    functionNamesToExtract = [functionNamesToExtract]
  }
  const { filename, code } = inputFile
  debugger
  const ast = recast.parse(code, {
    parser: babelParser,
    // sourceType: 'module'
  })

  const extractedFunctions = Object.fromEntries(
    functionNamesToExtract.map(
      functionName => [
        functionName,
        {
          extractedFunctionStatementPath: null,
          extractedFunctionStatement: null,
          extractedFunctionUsed: false,
        },
      ],
    ),
  )

  let extractedFunctionStatementPath
  let extractedFunctionStatement
  let extractedFunctionUsed = false
  const importDeclarationPaths = []
  const importDeclarations = []
  traverse(ast, {
    ImportDeclaration (path) {
      importDeclarationPaths.push(path)
      importDeclarations.push(path.node)
    },
    FunctionDeclaration (path) {
      const functionName = path.node.id.name
      if (extractedFunctions.hasOwnProperty(functionName)) {
        extractedFunctions[functionName].extractedFunctionStatementPath = path
        extractedFunctions[functionName].extractedFunctionStatement = path.node
        path.remove()
      }
    },
    Identifier (path) {
      const identifierName = path.node.name
      if (extractedFunctions.hasOwnProperty(identifierName)) {
        extractedFunctions[identifierName].extractedFunctionUsed = true
      }
    },
  })

  const files = []
  const importStatements = []
  for (const [functionNameToExtract, extractedFunction] of
    Object.entries(extractedFunctions)) {
    const {
      extractedFunctionStatementPath,
      extractedFunctionStatement,
      extractedFunctionUsed,
    } = extractedFunction
    if (extractedFunctionStatementPath) {
      const extractedFunctionFileName = `./${functionNameToExtract}.js`

      if (extractedFunctionUsed) {
        const importIdentifier = identifier(functionNameToExtract)
        const importStatement = importDeclaration(
          [importSpecifier(importIdentifier, importIdentifier)],
          stringLiteral(extractedFunctionFileName),
        )
        importStatements.push(importStatement)
      }

      const identifierNamesUsedByExtractedFunction = []
      traverse(extractedFunctionStatement.body, {
        Identifier (path) {
          identifierNamesUsedByExtractedFunction.push(path.node.name)
        },
      }, extractedFunctionStatementPath.scope, extractedFunctionStatementPath)

      function isImportSpecifierUsedByExtractedFunction (specifier) {
        return identifierNamesUsedByExtractedFunction.includes(specifier.local.name)
      }

      const extracedFunctionImports = []
      for (const importDeclaration of importDeclarations) {
        if (importDeclaration.specifiers.some(isImportSpecifierUsedByExtractedFunction)) {
          const clonedImportDeclaration = cloneNode(importDeclaration)
          clonedImportDeclaration.specifiers =
            clonedImportDeclaration.specifiers.filter(
              isImportSpecifierUsedByExtractedFunction)
          extracedFunctionImports.push(clonedImportDeclaration)
        }
      }

      const exportedExtractedFunction = exportNamedDeclaration(
        extractedFunctionStatement,
        [],
      )
      const extractedFunctionFile = file(program(
        extracedFunctionImports.concat([exportedExtractedFunction]),
        [],
        'module',
      ), [], [])
      const extractedFunctionFileCode = recast.print(extractedFunctionFile).code

      files.push({ filename: extractedFunctionFileName, code: extractedFunctionFileCode })
    }
  }

  const identifierNamesUsedInExportedFromFile = []
  traverse(ast, {
    Identifier (path) {
      if (path.parentPath.node.type !== 'ImportSpecifier') {
        console.log(path.parentPath.node.type)
        identifierNamesUsedInExportedFromFile.push(path.node.name)
      }
    },
  })
  const identifierNamesUsedInExportedFromFileSet = new Set(
    identifierNamesUsedInExportedFromFile)
  traverse(ast, {
    ImportDeclaration (path) {
      path.node.specifiers =
        path.node.specifiers.filter(specifier => identifierNamesUsedInExportedFromFileSet.has(
          specifier.local.name))
      if (path.node.specifiers.length === 0) {
        path.remove()
      }
    },
  })

  ast.program.body.unshift(...importStatements)

  const extractedFromFileCode = recast.print(ast).code

  files.unshift({ filename, code: extractedFromFileCode })

  return files
}
