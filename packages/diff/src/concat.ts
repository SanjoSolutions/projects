export function concat<T>(...arrays: T[][]): T[] {
  return Array.prototype.concat.call([], ...arrays);
}
