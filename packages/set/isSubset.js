export function isSubset(a, b) {
    const bSet = new Set(b);
    return [...a].every(element => bSet.has(element));
}
//# sourceMappingURL=isSubset.js.map