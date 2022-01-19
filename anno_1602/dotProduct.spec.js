import { test, expect } from '@jest/globals'
import { dotProduct } from './dotProduct.js'

test('dot product', () => {
  const A = [
    [1, 2],
    [3, 4],
  ]
  const B = [
    [5, 6],
    [7, 8],
  ]
  expect(dotProduct(A, B)).toEqual([
    [23, 34],
    [31, 46],
  ])
})
