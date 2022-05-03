import { groupByToMap } from "./groupByToMap.js";
export function groupBy(array, predicate) {
    return Object.fromEntries(groupByToMap(array, predicate).entries());
}
//# sourceMappingURL=groupBy.js.map