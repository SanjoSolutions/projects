import { NOutOfCache } from './NOutOfCache.js';
export declare function nOutOf<T>(n: number, set: Set<T>): Set<Set<T>>;
export declare namespace nOutOf {
    var indexSubSequencesCache: NOutOfCache;
}
export declare function getNextSubSequenceElementStartValue(subSequence: number[]): number;
//# sourceMappingURL=nOutOf.d.ts.map