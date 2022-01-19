import { describe, expect, it } from '@jest/globals'
import { factorial } from './factorial.js'

describe('factorial', () => {
  it('calculates the factorial', () => {
    expect(factorial(5)).toEqual(5 * 4 * 3 * 2 * 1)
  })
})
