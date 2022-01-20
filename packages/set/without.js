export function without(set, ...otherSets) {
    const result = new Set(set);
    for (const otherSet of otherSets) {
        for (const element of otherSet) {
            result.delete(element);
        }
    }
    return result;
}
//# sourceMappingURL=without.js.map