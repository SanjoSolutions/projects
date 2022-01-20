import { last } from '@sanjo/array';
import { nOutOfBase } from './nOutOfBase.js';
import { NOutOfCache } from './NOutOfCache.js';
export function nOutOfWithDuplicates(n, set) {
    return nOutOfBase(n, set, nOutOfWithDuplicates.indexSubSequencesCache, getNextSubSequenceElementStartValue);
}
nOutOfWithDuplicates.indexSubSequencesCache = new NOutOfCache();
export function getNextSubSequenceElementStartValue(subSequence) {
    return subSequence.length === 0 ? 0 : last(subSequence);
}
//# sourceMappingURL=nOutOfWithDuplicates.js.map