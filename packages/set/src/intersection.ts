export function intersection<T>(...sets: Iterable<T>[]): Set<T> {
  let result = Array.from(sets[0])
  for (const set of sets.slice(1)) {
    result = result.filter((element) => new Set(set).has(element))
  }
  return new Set(result)
}
