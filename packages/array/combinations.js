import { getIndexSubSequences } from './getIndexSubSequences.js';
export function combinations(setOrArray) {
    const array = [...setOrArray];
    let indexSubSequences;
    const length = array.length;
    if (combinations.indexSubSequencesCache.has(length)) {
        indexSubSequences = combinations.indexSubSequencesCache.get(length);
    }
    else {
        indexSubSequences = getIndexSubSequences(array.length);
        combinations.indexSubSequencesCache.set(length, indexSubSequences);
    }
    const subSequences = indexSubSequences.map(indexSubSequence => indexSubSequence.map(index => array[index]));
    return subSequences;
}
combinations.indexSubSequencesCache = new Map();
//# sourceMappingURL=combinations.js.map