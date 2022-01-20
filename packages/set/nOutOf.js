import { last } from '@sanjo/array';
export function nOutOf(n, set) {
    const elements = [...set];
    let indexSubSequences;
    const length = elements.length;
    if (nOutOf.indexSubSequencesCache.has(length, n)) {
        indexSubSequences = nOutOf.indexSubSequencesCache.get(length, n);
    }
    else {
        indexSubSequences = getIndexSubSequences(length, n);
        nOutOf.indexSubSequencesCache.set(length, n, indexSubSequences);
    }
    return new Set(indexSubSequences.map(indexSubSequence => new Set(indexSubSequence.map(index => elements[index]))));
}
class Cache {
    _cache = new Map();
    has(length, n) {
        const a = this._cache.get(length);
        if (a) {
            return a.has(n);
        }
        else {
            return false;
        }
    }
    get(length, n) {
        const a = this._cache.get(length);
        if (a) {
            return a.get(n) ?? null;
        }
        else {
            return null;
        }
    }
    set(length, n, item) {
        let a = this._cache.get(length);
        if (!a) {
            a = new Map();
            this._cache.set(length, a);
        }
        a.set(n, item);
    }
    clear() {
        this._cache = new Map();
    }
}
nOutOf.indexSubSequencesCache = new Cache();
function getIndexSubSequences(length, n) {
    console.log(length);
    const result = [];
    let subSequences = [[]];
    for (let iteration = 1; iteration <= length; iteration++) {
        const nextSubSequences = [];
        for (const subSequence of subSequences) {
            for (let value = subSequence.length === 0 ? 0 : last(subSequence) + 1; value <= length - 1; value++) {
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
//# sourceMappingURL=nOutOf.js.map