import { isSubset } from './isSubset.js';
export function isStrictSubset(a, b) {
    const aSet = new Set(a);
    const bSet = new Set(b);
    return bSet.size > aSet.size && isSubset(a, b);
}
//# sourceMappingURL=isStrictSubset.js.map