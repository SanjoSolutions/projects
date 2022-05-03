import { groupByToMap } from "./groupByToMap.js";
export function groupBy(set, predicate) {
    return new Set(groupByToMap(set, predicate).values());
}
//# sourceMappingURL=groupBy.js.map