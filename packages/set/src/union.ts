export function union<T>(...sets: Iterable<T>[]): Set<T> {
  const unionSet = new Set<T>()
  for (const set of sets) {
    for (const element of set) {
      unionSet.add(element)
    }
  }

  return unionSet
}
