import { describe, it, expect } from '@jest/globals'
import { multiply } from './multiply.js'

describe('multiply', () => {
  it('multiplies two numbers', () => {
    expect(multiply(2, 3)).toEqual(6)
  })
})
