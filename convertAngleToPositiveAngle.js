export function convertAngleToPositiveAngle(angle) {
  let positiveAngle
  if (angle >= 0) {
    positiveAngle = angle
  } else {
    positiveAngle = angle + 2 * Math.PI
  }
  return positiveAngle
}
