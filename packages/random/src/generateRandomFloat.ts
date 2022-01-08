/**
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 */
export function generateRandomFloat(min: number, max: number) {
  return min + (max - min) * Math.random()
}
