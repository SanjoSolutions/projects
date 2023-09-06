export function find<T>(
  set: Set<T>,
  predicate: (element: T) => boolean,
): T | undefined {
  return Array.from(set).find(predicate)
}
