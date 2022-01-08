import { humanToCamelCase } from './humanToCamelCase.js'

describe('humanToCamelCase', () => {
  it('transforms a human string to a camel case string', () => {
    expect(humanToCamelCase('hello world')).toEqual('helloWorld')
  })
})
