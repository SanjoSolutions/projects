import { last } from '@sanjo/array';
import { nOutOfBase } from './nOutOfBase.js';
import { ObjectCache } from '@sanjo/cache';
export function nOutOfWithDuplicates(n, set) {
    return nOutOfBase(n, set, nOutOfWithDuplicates.indexSubSequencesCache, getNextSubSequenceElementStartValue);
}
nOutOfWithDuplicates.indexSubSequencesCache = new ObjectCache();
export function getNextSubSequenceElementStartValue(subSequence) {
    return subSequence.length === 0 ? 0 : last(subSequence);
}
//# sourceMappingURL=nOutOfWithDuplicates.js.map