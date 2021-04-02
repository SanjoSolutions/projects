export function min(numbers: (number | undefined)[]): number | undefined {
  numbers = numbers.filter((number) => number !== undefined)
  return numbers.length >= 1 ? Math.min(...(numbers as number[])) : undefined
}
