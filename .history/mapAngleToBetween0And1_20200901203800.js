import { normalizeAngle } from './normalizeAngle';

export function mapAngleToBetween0And1(angle) {
  return normalizeAngle(angle) / (2 * Math.PI)
}
