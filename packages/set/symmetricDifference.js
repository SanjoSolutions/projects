export function symmetricDifference(setA, setB) {
    const result = new Set();
    for (const element of setA) {
        if (!setB.has(element)) {
            result.add(element);
        }
    }
    for (const element of setB) {
        if (!setA.has(element)) {
            result.add(element);
        }
    }
    return result;
}
//# sourceMappingURL=symmetricDifference.js.map