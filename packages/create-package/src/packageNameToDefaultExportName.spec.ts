import { packageNameToDefaultExportName } from './packageNameToDefaultExportName.js'

describe('packageNameToDefaultExportName', () => {
  it('"@sanjo/escape-for-reg-exp" to "escapeForRegExp"', () => {
    expect(packageNameToDefaultExportName('@sanjo/escape-for-reg-exp')).toEqual('escapeForRegExp')
  })

  it('"escape-for-reg-exp" to "escapeForRegExp"', () => {
    expect(packageNameToDefaultExportName('escape-for-reg-exp')).toEqual('escapeForRegExp')
  })
})
