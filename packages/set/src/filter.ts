export function filter<T>(
  set: Set<T>,
  predicate: (element: T) => boolean,
): Set<T> {
  return new Set(Array.from(set).filter(predicate))
}
