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
function ensureEntryInMap(map, key, createDefaultValue) {
    if (!map.has(key)) {
        map.set(key, createDefaultValue());
    }
}
//# sourceMappingURL=groupByToMap.js.map