export function union(setA, setB) {
    const unionSet = new Set();
    for (const value of setA) {
        unionSet.add(value);
    }
    for (const value of setB) {
        unionSet.add(value);
    }
    return unionSet;
}
//# sourceMappingURL=union.js.map