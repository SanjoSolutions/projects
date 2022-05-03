import { flat } from "./flat.js";
import { map } from "./map.js";
export function flatMap(set, predicate) {
    return flat(map(set, predicate));
}
//# sourceMappingURL=flatMap.js.map