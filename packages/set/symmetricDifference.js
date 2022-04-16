export function symmetricDifference(...sets) {
    let result = new Set(sets[0]);
    const elementsThatAreInMultipleSets = new Set();
    for (const set of sets.slice(1)) {
        for (const element of set) {
            if (!elementsThatAreInMultipleSets.has(element)) {
                if (result.has(element)) {
                    elementsThatAreInMultipleSets.add(element);
                    result.delete(element);
                }
                else {
                    result.add(element);
                }
            }
        }
    }
    return result;
}
//# sourceMappingURL=symmetricDifference.js.map