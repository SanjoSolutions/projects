import { last } from '@sanjo/array';
import { nOutOfBase } from './nOutOfBase.js';
import { Cache } from '@sanjo/cache';
export function nOutOf(n, set) {
    return nOutOfBase(n, set, nOutOf.indexSubSequencesCache, getNextSubSequenceElementStartValue);
}
nOutOf.indexSubSequencesCache = new Cache();
export function getNextSubSequenceElementStartValue(subSequence) {
    return subSequence.length === 0 ? 0 : last(subSequence) + 1;
}
//# sourceMappingURL=nOutOf.js.map