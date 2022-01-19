export function multiply(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((result, value) => result * value)
}
