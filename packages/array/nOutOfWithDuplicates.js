export function nOutOfWithDuplicates(n, array) {
    let sequences = [[]];
    for (let i = 1; i <= n; i++) {
        const nextSequences = [];
        for (const sequence of sequences) {
            for (const element of array) {
                nextSequences.push([...sequence, element]);
            }
        }
        sequences = nextSequences;
    }
    return sequences;
}
//# sourceMappingURL=nOutOfWithDuplicates.js.map