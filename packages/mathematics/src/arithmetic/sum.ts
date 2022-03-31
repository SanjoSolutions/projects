import { add } from './add.js'

export function sum(array: number[]) {
  return Array.from(array).reduce(add, 0)
}
