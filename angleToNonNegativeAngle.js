export function angleToNonNegativeAngle(angle) {
  let nonNegativeAngle;
  if (angle >= 0) {
    nonNegativeAngle = angle;
  } else {
    nonNegativeAngle = angle + 2 * Math.PI;
  }
  return nonNegativeAngle;
}
