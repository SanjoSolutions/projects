import { normalizeAngle } from "./normalizeAngle.js"

export function mapAngleToBetween0And1(angle) {
  return normalizeAngle(angle) / (2 * Math.PI)
}
