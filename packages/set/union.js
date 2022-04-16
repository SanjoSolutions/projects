export function union(...sets) {
    const unionSet = new Set();
    for (const set of sets) {
        for (const element of set) {
            unionSet.add(element);
        }
    }
    return unionSet;
}
//# sourceMappingURL=union.js.map