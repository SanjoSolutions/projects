export function intersection(...sets) {
    let result = Array.from(sets[0]);
    for (const set of sets.slice(1)) {
        result = result.filter(element => new Set(set).has(element));
    }
    return new Set(result);
}
//# sourceMappingURL=intersection.js.map