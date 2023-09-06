import { generateRandomFloat } from "./generateRandomFloat.js"

/**
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 */
export function generateRandomInteger(min: number, max: number) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(generateRandomFloat(min, max))
}
