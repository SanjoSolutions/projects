export function cartesianProduct<T, U>(setA: Set<T>, setB: Set<U>): Set<[T, U]> {
  const result = new Set<[T, U]>()
  setA.forEach(valueA => setB.forEach(valueB => result.add([valueA, valueB])))
  return result
}
