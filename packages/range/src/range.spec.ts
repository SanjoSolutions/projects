import { describe, it, expect } from '@jest/globals'
import { range } from './range.js'

describe('range', () => {
  it('returns a generator for a range of numbers', () => {
    expect([...range(1, 3)]).toEqual([1, 2, 3])
  })

  it('supports an interval', () => {
    expect([...range(1, 10, 2)]).toEqual([1, 3, 5, 7, 9])
  })
})
