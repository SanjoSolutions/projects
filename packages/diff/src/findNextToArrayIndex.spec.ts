import { describe, expect, it, test } from '@jest/globals'
import { findNextToArrayIndex } from './findNextToArrayIndex.js'

describe('findNextToArrayIndex', () => {
  it('finds the next index in the array of the search element', () => {
    const array = [1, 2, 3]
    expect(findNextToArrayIndex(array, [], 2, 0)).toEqual(1)
  })

  it('finds the next index in the array of the search element, starting from the fromIndex', () => {
    const array = [1, 1]
    expect(findNextToArrayIndex(array, [], 1, 1)).toEqual(1)
  })

  test('', () => {
    // from: 2 2 3
    // to: 2 2 3
  })
})
