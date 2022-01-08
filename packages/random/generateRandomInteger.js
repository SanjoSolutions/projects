import { generateRandomFloat } from './generateRandomFloat.js'
/**
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 */
export function generateRandomInteger(min, max) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(generateRandomFloat(min, max))
}
//# sourceMappingURL=generateRandomInteger.js.map
