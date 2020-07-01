import { dashToCamelCase } from './dashToCamelCase'

describe('dashToCamelCase', () => {
  it('"escape-for-reg-exp" to "escapeForRegExp"', () => {
    expect(dashToCamelCase('escape-for-reg-exp')).toEqual('escapeForRegExp')
  })
})
