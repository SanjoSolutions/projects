import { multiply } from './multiply'

export function product(numbers: number[]): number {
  return numbers.reduce(multiply)
}
