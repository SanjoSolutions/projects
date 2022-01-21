import { describe, it, expect } from '@jest/globals'
import { symmetricDifference } from './symmetricDifference'

describe('symmetricDifference', () => {
  it('returns the symmetric difference of two sets', () => {
    const a = new Set([1, 2])
    const b = new Set([2, 3])
    const result = symmetricDifference(a, b)
    expect(result).toEqual(new Set([1, 3]))
  })
})
