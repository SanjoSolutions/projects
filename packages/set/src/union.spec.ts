import { expect, test } from '@jest/globals'
import { union } from './union.js'

test('union', () => {
  const a = new Set([1])
  const b = new Set([2])
  const c = union(a, b)
  expect(c).toEqual(new Set([1, 2]))
})

test('union more than 2 sets', () => {
  const a = new Set([1])
  const b = new Set([2])
  const c = new Set([3])
  const result = union(a, b, c)
  expect(result).toEqual(new Set([1, 2, 3]))
})
