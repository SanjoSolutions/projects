import { difference } from './difference.js';
import { intersection } from './intersection.js';
import { union } from './union.js';
export function symmetricDifference(setA, setB) {
    return difference(union(setA, setB), intersection(setA, setB));
}
//# sourceMappingURL=symmetricDifference.js.map