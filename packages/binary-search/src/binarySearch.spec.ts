import { binarySearch } from './binarySearch.js'
import { numberCompareFn } from './numberCompareFn.js'

describe('binarySearch', () => {
  it('searches for an item with binary search', () => {
    const list = [1, 3, 4, 6, 7, 8, 10, 13, 14, 18, 19, 21, 24, 37, 40, 45, 71]
    const result = binarySearch<number>(list, numberCompareFn, 7)
    expect(result.index).toEqual(4)
    expect(result.value).toBe(7)
  })

  it('returns {index: -1, value: null} when item not found', () => {
    const list: number[] = []
    const result = binarySearch<number>(list, numberCompareFn, 1)
    expect(result).toEqual({ index: -1, value: null })
  })
})
