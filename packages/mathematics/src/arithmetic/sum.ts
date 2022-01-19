import { plus } from './plus.js'

export function sum(array: number[]) {
  return Array.from(array).reduce(plus)
}
