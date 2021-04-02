import { plus } from "../arithmetic/plus.js";

export function sum(array) {
  return Array.from(array).reduce(plus);
}
