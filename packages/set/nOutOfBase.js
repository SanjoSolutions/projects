export function nOutOfBase(n, set, cache, getNextSubSequenceElementStartValue) {
    const elements = [...set];
    let indexSubSequences;
    const length = elements.length;
    const key = { length, n };
    if (cache.has(key)) {
        indexSubSequences = cache.get(key);
    }
    else {
        indexSubSequences = getIndexSubSequences(length, n, getNextSubSequenceElementStartValue);
        cache.set(key, indexSubSequences);
    }
    return new Set(indexSubSequences.map(indexSubSequence => new Set(indexSubSequence.map(index => elements[index]))));
}
export function getIndexSubSequences(length, n, getNextSubSequenceElementStartValue) {
    const result = [];
    let subSequences = [[]];
    for (let iteration = 1; iteration <= length; iteration++) {
        const nextSubSequences = [];
        for (const subSequence of subSequences) {
            for (let value = getNextSubSequenceElementStartValue(subSequence); value <= length - 1; value++) {
                const nextSubsequence = [...subSequence, value];
                nextSubSequences.push(nextSubsequence);
                if (nextSubsequence.length === n) {
                    result.push(nextSubsequence);
                }
            }
        }
        subSequences = nextSubSequences;
    }
    return result;
}
//# sourceMappingURL=nOutOfBase.js.map