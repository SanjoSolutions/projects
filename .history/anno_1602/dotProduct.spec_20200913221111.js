import { expect, specification } from '../specification/index.js';
import { dotProduct } from './dotProduct.js';

specification('dot product', () => {
  const A = [
    [1, 2],
    [3, 4]
  ]
  const B = [
    [5, 6],
    [7, 8]
  ]
  expect(dotProduct(A, B)).toEqual([
    [23, 31],
    [34, 46]
  ])
})
