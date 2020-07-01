import { camelCaseToUnderscore } from './camelCaseToUnderscore'

describe('camelCaseToUnderscore', () => {
  it('"fooBarBaz" to "foo_bar_baz"', () => {
    expect(camelCaseToUnderscore('fooBarBaz')).toEqual('foo_bar_baz')
  })
})
