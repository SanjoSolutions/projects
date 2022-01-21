/**
 * @see https://en.wikipedia.org/wiki/Cartesian_product
 */
export function cartesianProduct<T, U>(setA: Set<T> | T[], setB: Set<U> | U[]): Set<[T, U]> {
  const result = new Set<[T, U]>()
  setA.forEach(valueA => setB.forEach(valueB => result.add([valueA, valueB])))
  return result
}
