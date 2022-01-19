import { isSubset } from './isSubset.js';
export function isStrictSubset(a, b) {
    return b.size > a.size && isSubset(a, b);
}
//# sourceMappingURL=isStrictSubset.js.map