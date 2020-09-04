import { angleToBetween0And2PIAngle } from './angleToBetween0And2PIAngle';
import { angleToNonNegativeAngle } from './angleToNonNegativeAngle';

export function normalizeAngle(angle) {
  return angleToNonNegativeAngle(angleToBetween0And2PIAngle(angle))
}
