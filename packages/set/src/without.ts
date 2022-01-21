export function without<T>(set: Iterable<T>, ...otherSets: Iterable<T>[]): Set<T> {
  const result = new Set(set)
  for (const otherSet of otherSets) {
    for (const element of otherSet) {
      result.delete(element)
    }
  }
  return result
}
