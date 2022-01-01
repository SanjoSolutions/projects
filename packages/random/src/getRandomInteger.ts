import { getRandomFloat } from './getRandomFloat.js'

/**
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 */
export function getRandomInteger(min: number, max: number) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(getRandomFloat(min, max))
}
