import { describe, it, expect } from '@jest/globals'
import { product } from './product.js'

describe('product', () => {
  it('it returns the product of the elements of the array', () => {
    expect(product([1, 2, 3])).toEqual(6)
  })
})
