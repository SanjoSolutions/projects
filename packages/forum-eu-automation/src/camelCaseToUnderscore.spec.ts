import { describe, expect, it } from '@jest/globals'
import { camelCaseToUnderscore } from './camelCaseToUnderscore.js'

describe('camelCaseToUnderscore', () => {
  it('"fooBarBaz" to "foo_bar_baz"', () => {
    expect(camelCaseToUnderscore('fooBarBaz')).toEqual('foo_bar_baz')
  })
})
