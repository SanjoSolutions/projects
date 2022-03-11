import { multiply } from './multiply.js'

export function product(numbers: number[]): number {
  return numbers.reduce(multiply)
}
