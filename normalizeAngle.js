import { angleToBetween0And2PIAngle } from "./angleToBetween0And2PIAngle.js";
import { convertAngleToPositiveAngle } from "./convertAngleToPositiveAngle.js";

export function normalizeAngle(angle) {
  return convertAngleToPositiveAngle(angleToBetween0And2PIAngle(angle));
}
