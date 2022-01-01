/**
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 */
export function getRandomFloat(min: number, max: number) {
  return min + (max - min) * Math.random()
}
