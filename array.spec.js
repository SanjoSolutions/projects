import { combinations, concat, max, min, sum } from './array.js'

describe('sum', () => {
  it('adds the numbers in an array', () => {
    expect(sum([1, 2, 3])).toEqual(6)
  })
})

describe('max', () => {
  it('returns the maximum', () => {
    expect(max([2, 3, 1])).toEqual(3)
    expect(max([{ a: 2 }, { a: 3 }, { a: 1 }], object => object.a))
    .toEqual({ a: 3 })
    expect(max([])).toEqual(null)
  })
})

describe('min', () => {
  it('returns the minimum', () => {
    expect(min([2, 3, 1])).toEqual(1)
    expect(min([{ a: 2 }, { a: 3 }, { a: 1 }], object => object.a))
    .toEqual({ a: 1 })
    expect(min([])).toEqual(null)
  })
})

describe('concat', () => {
  it('concatenates multiple arrays', () => {
    expect(concat([1, 2], [3], [4, 5])).toEqual([1, 2, 3, 4, 5])
  })
})

describe('combinations', () => {
  it('returns all combinations', () => {
    expect(combinations([1, 2, 3]))
    .toEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])
  })
})

