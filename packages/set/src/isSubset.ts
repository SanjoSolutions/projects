export function isSubset<T>(a: Iterable<T>, b: Set<T>): boolean {
  return [...a].every(element => b.has(element))
}
