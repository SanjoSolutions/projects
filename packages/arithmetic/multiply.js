export function multiply(values) {
  return values.length === 0
    ? 0
    : values.reduce((result, value) => result * value)
}
