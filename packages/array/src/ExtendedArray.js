import { max } from "./max.js";
import { min } from "./min.js";
import { sum } from "./sum.js";

export class ExtendedArray extends Array {
  sum() {
    return sum(this);
  }

  max() {
    return max(this);
  }

  min() {
    return min(this);
  }
}
