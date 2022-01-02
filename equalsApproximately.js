export function equalsApproximately(a, b, epsilon) {
  console.log(Math.abs(a - b))
  return Math.abs(a - b) < epsilon
}
