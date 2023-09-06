import { add } from "./add.js"

export function sum(array: Iterable<number> | ArrayLike<number>) {
  return Array.from(array).reduce(add, 0)
}
