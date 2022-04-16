export function intersection<T>(firstSet: Iterable<T>, ...otherSets: Set<T>[]): Set<T> {
  let result = Array.from(firstSet)
  for (const set of otherSets) {
    result = result.filter(value => set.has(value))
  }
  return new Set(result)
}
