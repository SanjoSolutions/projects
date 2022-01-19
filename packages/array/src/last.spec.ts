import { describe, it, expect } from '@jest/globals'
import { last } from './last.js'

describe('last', () => {
  it('returns the last element', () => {
    expect(last([1, 2])).toEqual(2)
  })

  describe('when the array has a length of 0', () => {
    it('returns null', () => {
      expect(last([])).toEqual(null)
    })
  })
})
