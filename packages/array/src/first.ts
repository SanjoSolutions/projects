export function first<T>(array: T[]): T | null {
  return array.length >= 1 ? array[0] : null
}
