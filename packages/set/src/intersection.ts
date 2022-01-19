export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter(value => setB.has(value)))
}
