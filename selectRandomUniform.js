import { randomInteger } from "./randomInteger.js"

export function selectRandomUniform(values) {
  return values[randomInteger(0, values.length - 1)]
}
