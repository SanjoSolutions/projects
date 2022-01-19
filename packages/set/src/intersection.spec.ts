import { describe, expect, it } from '@jest/globals'
import { intersection } from './intersection.js'

describe('intersection', () => {
  it('returns the intersection of two sets', () => {
    expect(intersection(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([2]))
  })
})
