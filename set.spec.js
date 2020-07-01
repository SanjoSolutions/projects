import { intersection } from './set.js'

describe('intersection', () => {
  it('returns the intersection of two sets', () => {
    expect(intersection(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([2]))
  })
})
