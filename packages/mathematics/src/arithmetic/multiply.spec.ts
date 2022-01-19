import { describe, it, expect } from '@jest/globals'
import { multiply } from './multiply.js'

describe('multiply', () => {
  it('returns 0 when an array with 0 elements is given', () => {
    expect(multiply([])).toEqual(0)
  })

  it('returns the product of the elements of the given array', () => {
    expect(multiply([1, 2, 3])).toEqual(6)
  })
})
