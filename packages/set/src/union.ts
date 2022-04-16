export function union<T>(...sets: Iterable<T>[]): Set<T> {
  const unionSet = new Set<T>()
  for (const set of sets) {
    for (const value of set) {
      unionSet.add(value)
    }
  }

  return unionSet
}
