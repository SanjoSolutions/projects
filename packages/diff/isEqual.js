import { arrayDiff } from "./arrayDiff.js";
import { isObject } from "./isObject.js";
import { objectDiff } from "./objectDiff.js";
export function isEqual(a, b) {
    return (a === b ||
        (isObject(a) && isObject(b) && objectDiff(a, b).length === 0) ||
        (Array.isArray(a) && Array.isArray(b) && arrayDiff(a, b).length === 0));
}
//# sourceMappingURL=isEqual.js.map