export function without<T>(...sets: Iterable<T>[]): Set<T> {
  const result = new Set(sets[0])
  for (const otherSet of sets.slice(1)) {
    for (const element of otherSet) {
      result.delete(element)
    }
  }
  return result
}
