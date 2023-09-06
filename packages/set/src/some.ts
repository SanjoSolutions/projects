export function some<T>(
  set: Set<T>,
  predicate: (element: T) => boolean,
): boolean {
  return Array.from(set).some(predicate)
}
