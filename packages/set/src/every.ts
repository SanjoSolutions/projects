export function every<T>(
  set: Set<T>,
  predicate: (element: T) => boolean
): boolean {
  return Array.from(set).every(predicate);
}
