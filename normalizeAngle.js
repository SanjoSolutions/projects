import { angleToBetween0And2PIAngle } from "./angleToBetween0And2PIAngle.js";
import { angleToPositiveAngle } from "./angleToPositiveAngle.js";

export function normalizeAngle(angle) {
  return angleToPositiveAngle(angleToBetween0And2PIAngle(angle));
}
