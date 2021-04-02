import { duadEquals } from "./duadEquals.js"
import { zip } from "./zip.js"

export function arrayEquals(a, b) {
  return zip(a, b).every(duadEquals)
}
