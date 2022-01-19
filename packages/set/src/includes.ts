import { intersection } from './intersection.js'

export function includes<T>(setA: Set<T>, setB: Set<T>): boolean {
  return intersection(setA, setB).size === setB.size
}
