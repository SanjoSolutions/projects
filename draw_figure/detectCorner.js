export function detectCorner ([a, c, b]) {
  let angleA = Math.atan2(
    a[1] - c[1],
    a[0] - c[0],
  )
  if (angleA < 0) {
    angleA += (2 * Math.PI)
  }
  let angleB = Math.atan2(
    b[1] - c[1],
    b[0] - c[0],
  )
  if (angleB < 0) {
    angleB += (2 * Math.PI)
  }
  let diffAngle = Math.abs(angleB - angleA)
  if (diffAngle > (1 / 2) * (2 * Math.PI)) {
    diffAngle = (2 * Math.PI) - diffAngle
  }
  return diffAngle > 0 && diffAngle <= (2 * Math.PI) / 360 * 135
}
