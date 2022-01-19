export function intersection(setA, setB) {
    return new Set([...setA].filter(value => setB.has(value)));
}
//# sourceMappingURL=intersection.js.map