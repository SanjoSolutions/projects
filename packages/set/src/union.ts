export function union<T>(setA: Iterable<T>, setB: Iterable<T>): Set<T> {
  const unionSet = new Set<T>()
  for (const value of setA) {
    unionSet.add(value)
  }
  for (const value of setB) {
    unionSet.add(value)
  }
  return unionSet
}
