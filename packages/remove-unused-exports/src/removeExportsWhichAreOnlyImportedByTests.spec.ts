import {
  blockStatement,
  classBody,
  classDeclaration,
  exportNamedDeclaration,
  exportSpecifier,
  functionDeclaration,
  identifier,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types'
import { describe, expect, it, test } from '@jest/globals'
import {
  convertToAbsolutePath, isClassDeclarationThatIsExportingName,
  isExportingName,
  isExportingNameDirectly,
  isFunctionDeclarationThatIsExportingName,
  isSpecifierExportingName,
  isVariableDeclarationThatIsExportingName,
} from './removeExportsWhichAreOnlyImportedByTests.js'

describe.only('isExportingName', () => {
  test('`export { exportedThing }` exports "exportedThing"', () => {
    const exportedThingName = 'exportedThing'
    const anExport = exportNamedDeclaration(null, [
      exportSpecifier(identifier(exportedThingName), identifier(exportedThingName)),
    ])
    const name = exportedThingName
    expect(isExportingName(anExport, name)).toEqual(true)
  })
})

describe.only('isVariableDeclarationThatIsExportingName', () => {
  test('`export const exportedConst = null` exports "exportedConst"', () => {
    const exportedConstName = 'exportedConst'
    const anExport = exportNamedDeclaration(variableDeclaration(
      'const',
      [variableDeclarator(identifier(exportedConstName))],
    ))
    const name = exportedConstName
    expect(isVariableDeclarationThatIsExportingName(anExport, name)).toEqual(true)
  })
})

describe.only('isFunctionDeclarationThatIsExportingName', () => {
  test('`export function exportedFunction() {}` exports "exportedFunction"', () => {
    const exportedFunctionName = 'exportedFunction'
    const anExport = exportNamedDeclaration(functionDeclaration(
      identifier(exportedFunctionName),
      [],
      blockStatement([]),
    ))
    const name = exportedFunctionName
    expect(isFunctionDeclarationThatIsExportingName(anExport, name)).toEqual(true)
  })
})

describe.only('isClassDeclarationThatIsExportingName', () => {
  test('`export class ExportedClass {}` exports "ExportedClass"', () => {
    const exportedClassName = 'ExportedClass'
    const anExport = exportNamedDeclaration(classDeclaration(identifier(exportedClassName), null, classBody([])))
    const name = exportedClassName
    expect(isClassDeclarationThatIsExportingName(anExport, name))
  })
})

describe.only('isExportingNameDirectly', () => {
  test('`export { exportedThing }` exports "exportedThing"', () => {
    const exportedThingName = 'exportedThing'
    const anExport = exportNamedDeclaration(null, [
      exportSpecifier(identifier(exportedThingName), identifier(exportedThingName)),
    ])
    const name = exportedThingName
    expect(isExportingNameDirectly(anExport, name)).toEqual(true)
  })
})

describe.only('isSpecifierExportingName', () => {
  it('works for exported being a string literal', () => {
    const name = 'name'
    const ast = exportSpecifier(identifier(name), stringLiteral(name))
    expect(isSpecifierExportingName(name, ast)).toEqual(true)
  })
})

describe.only('convertToAbsolutePath', () => {
  it('converts a relative path to an absolute path', () => {
    const filePath = '/home/test/'
    const relativeImportPath = './file.js'
    expect(convertToAbsolutePath(filePath, relativeImportPath)).toEqual('/home/test/file.js')
  })

  it('keeps an absolute path an absolute path', () => {
    const filePath = '/home/test/'
    const absolutePath = '/home/test2/file.js'
    expect(convertToAbsolutePath(filePath, absolutePath)).toEqual(absolutePath)
  })
})
