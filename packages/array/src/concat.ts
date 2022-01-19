export function concat<T>(...arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays)
}
