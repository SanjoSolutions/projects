import { getIndexSubSequences } from './getIndexSubSequences.js';
/**
 * @see https://en.wikipedia.org/wiki/Power_set
 */
export function powerSet(set) {
    const array = [...set];
    array.sort();
    const indexSubSequences = getIndexSubSequences(array.length);
    const subSequences = indexSubSequences.map(indexSubSequence => indexSubSequence.map(index => array[index]));
    const subSets = subSequences.map(subSequence => new Set(subSequence));
    const result = new Set(subSets);
    return result;
}
//# sourceMappingURL=powerSet.js.map