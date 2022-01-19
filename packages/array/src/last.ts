export function last<T>(array: T[]): T | null {
  const length = array.length
  return length >= 1 ? array[length - 1] : null
}
