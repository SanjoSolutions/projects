/**
 * @see https://en.wikipedia.org/wiki/Cartesian_product
 */
export function cartesianProduct<T, U>(setA: Iterable<T>, setB: Iterable<U>): Set<[T, U]> {
  const result = new Set<[T, U]>()
  for (const elementA of setA) {
    for (const elementB of setB) {
      result.add([elementA, elementB])
    }
  }
  return result
}
