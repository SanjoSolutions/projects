import { isSubset } from './isSubset.js'

export function isStrictSubset<T>(a: Iterable<T>, b: Iterable<T>): boolean {
  const aSet = new Set(a)
  const bSet = new Set(b)
  return bSet.size > aSet.size && isSubset(a, b)
}
