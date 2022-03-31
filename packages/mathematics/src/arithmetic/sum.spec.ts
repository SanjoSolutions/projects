import { describe, expect, it } from '@jest/globals'
import { sum } from './sum.js'

describe('sum', () => {
  it('adds the numbers in an array', () => {
    expect(sum([1, 2, 3])).toEqual(6)
  })

  it('returns 0 when an empty array is given', () => {
    expect(sum([])).toEqual(0)
  })
})
