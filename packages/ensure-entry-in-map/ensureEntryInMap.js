export function ensureEntryInMap(map, key, createDefaultValue) {
    if (!map.has(key)) {
        map.set(key, createDefaultValue());
    }
}
//# sourceMappingURL=ensureEntryInMap.js.map