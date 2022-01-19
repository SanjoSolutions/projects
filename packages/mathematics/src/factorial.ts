export function factorial(value: number): number {
  let result = value
  for (let i = result - 1; i >= 2; i--) {
    result *= i
  }
  return result
}
