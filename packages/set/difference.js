export function difference(firstSet, ...otherSets) {
    const differenceSet = new Set(firstSet);
    for (const set of otherSets) {
        for (const element of set) {
            differenceSet.delete(element);
        }
    }
    return differenceSet;
}
//# sourceMappingURL=difference.js.map