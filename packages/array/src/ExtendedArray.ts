import { max } from './max';
import { min } from './min';
import { sum } from './sum';

export class ExtendedArray extends Array {
  sum () {
    return sum(this);
  }

  max () {
    return max(this);
  }

  min () {
    return min(this);
  }
}
