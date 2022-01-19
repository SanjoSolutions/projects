import { describe, it, expect } from '@jest/globals'
import { StringValueNotFoundError } from '../StringValueNotFoundError.js'
import { replaceStringValue } from './replaceStringValue.js'

describe('replaceStringValue', () => {
  it('replaces "Login Activity" with "R.string.lgn_act"', () => {
    const lookUp = new Map([['Login Activity', 'lgn_act']])
    expect(replaceStringValue(lookUp, 'Login Activity')).toEqual('R.string.lgn_act')
  })

  it('replaces "Register Me Too" with "R.string.rgst_me"', () => {
    const lookUp = new Map([['Register Me Too', 'rgst_me']])
    expect(replaceStringValue(lookUp, 'Register Me Too')).toEqual('R.string.rgst_me')
  })

  describe('when the string value does not exist in the look-up', () => {
    it('throws an StringValueNotFoundError', () => {
      const lookUp = new Map([])
      expect(() => replaceStringValue(lookUp, 'Some string')).toThrowError(
        new StringValueNotFoundError('String value "Some string" has not been found in look-up.')
      )
    })
  })
})
