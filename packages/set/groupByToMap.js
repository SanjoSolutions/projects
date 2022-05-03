import { ensureEntryInMap } from "@sanjo/ensure-entry-in-map";
export function groupByToMap(set, predicate) {
    const groups = new Map();
    const createDefaultValue = () => new Set();
    for (const element of set) {
        const groupValue = predicate(element);
        ensureEntryInMap(groups, groupValue, createDefaultValue);
        const group = groups.get(groupValue);
        group.add(element);
    }
    return groups;
}
//# sourceMappingURL=groupByToMap.js.map