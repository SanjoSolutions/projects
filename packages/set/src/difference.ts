export function difference<T>(
  firstSet: Iterable<T>,
  ...otherSets: Iterable<T>[]
): Set<T> {
  const differenceSet = new Set(firstSet)
  for (const set of otherSets) {
    for (const element of set) {
      differenceSet.delete(element)
    }
  }
  return differenceSet
}
