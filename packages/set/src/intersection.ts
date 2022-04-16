export function intersection<T>(...sets: Iterable<T>[]): Set<T> {
  let result = Array.from(sets[0])
  for (const set of sets.slice(1)) {
    result = result.filter(value => new Set(set).has(value))
  }
  return new Set(result)
}
