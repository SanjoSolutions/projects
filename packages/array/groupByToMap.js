import { ensureEntryInMap } from "@sanjo/ensure-entry-in-map";
export function groupByToMap(array, predicate) {
    const groups = new Map();
    const createDefaultValue = () => [];
    for (const element of array) {
        const groupValue = predicate(element);
        ensureEntryInMap(groups, groupValue, createDefaultValue);
        const group = groups.get(groupValue);
        group.push(element);
    }
    return groups;
}
//# sourceMappingURL=groupByToMap.js.map