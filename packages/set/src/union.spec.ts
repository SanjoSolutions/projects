import { union } from './union.js'

test('union', () => {
  const a = new Set([1])
  const b = new Set([2])
  const c = union(a, b)
  expect(c).toEqual(new Set([1, 2]))
})
