export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const differenceSet = new Set<T>()
  for (const value of setA) {
    if (!setB.has(value)) {
      differenceSet.add(value)
    }
  }
  return differenceSet
}
