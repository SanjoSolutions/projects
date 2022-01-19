import { difference } from './difference.js'
import { intersection } from './intersection.js'
import { union } from './union.js'

export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return difference(union(setA, setB), intersection(setA, setB))
}
