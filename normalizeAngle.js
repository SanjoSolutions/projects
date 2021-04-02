import { angleToBetween0And2PIAngle } from "./angleToBetween0And2PIAngle.js"
import { angleToNonNegativeAngle } from "./angleToNonNegativeAngle.js"

export function normalizeAngle(angle) {
  return angleToNonNegativeAngle(angleToBetween0And2PIAngle(angle))
}
