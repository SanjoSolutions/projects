import { test, expect } from '@jest/globals'
import { scalarProduct } from './scalarProduct.js'

test('scalar product', () => {
  expect(scalarProduct(2, [3, 4])).toEqual([6, 8])
})
