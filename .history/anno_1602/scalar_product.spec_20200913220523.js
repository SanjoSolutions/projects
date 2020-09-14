import { expect, specification } from '../packages/specification/index.js';
import { scalarProduct } from './scalarProduct.js';

specification('scalar product', () => {
  expect(scalarProduct(2, [3, 4])).toEqual([6, 8])
})
