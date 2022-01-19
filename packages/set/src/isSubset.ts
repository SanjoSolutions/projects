export function isSubset<T>(a: Set<T>, b: Set<T>): boolean {
  return [...a].every(element => b.has(element))
}
