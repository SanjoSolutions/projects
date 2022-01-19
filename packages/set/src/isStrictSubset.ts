import { isSubset } from './isSubset.js'

export function isStrictSubset<T>(a: Set<T>, b: Set<T>): boolean {
  return b.size > a.size && isSubset(a, b)
}
