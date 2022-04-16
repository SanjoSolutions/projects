export function isSubset<T>(a: Iterable<T>, b: Iterable<T>): boolean {
  const bSet = new Set(b)
  return [...a].every(element => bSet.has(element))
}
