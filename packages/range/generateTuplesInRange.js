export function generateTuplesInRange(ranges) {
    let tuples = [[]];
    for (const range of ranges) {
        const nextTuples = [];
        for (const tuple of tuples) {
            const [from, to, interval] = range;
            for (let i = from; i <= to; i += interval) {
                const nextTuple = [...tuple, i];
                nextTuples.push(nextTuple);
            }
        }
        tuples = nextTuples;
    }
    return tuples;
}
//# sourceMappingURL=generateTuplesInRange.js.map