import { describe, expect, it } from '@jest/globals'
import { intersection } from './intersection.js'

describe('intersection', () => {
  it('returns the intersection of two sets', () => {
    expect(intersection(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([2]))
  })

  it('supports more than 2 sets as input', () => {
    expect(intersection(new Set([1, 2]), new Set([2, 3]), new Set([4]))).toEqual(new Set([]))
  })
})
