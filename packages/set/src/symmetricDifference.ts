export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result: Set<T> = new Set()
  for (const element of setA) {
    if (!setB.has(element)) {
      result.add(element)
    }
  }
  for (const element of setB) {
    if (!setA.has(element)) {
      result.add(element)
    }
  }
  return result
}
