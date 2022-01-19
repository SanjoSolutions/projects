export function difference(setA, setB) {
    const differenceSet = new Set();
    for (const value of setA) {
        if (!setB.has(value)) {
            differenceSet.add(value);
        }
    }
    return differenceSet;
}
//# sourceMappingURL=difference.js.map