export function intersection<T>(firstSet: Iterable<T>, ...otherSets: Iterable<T>[]): Set<T> {
  let result = Array.from(firstSet)
  for (const set of otherSets) {
    result = result.filter(value => new Set(set).has(value))
  }
  return new Set(result)
}
