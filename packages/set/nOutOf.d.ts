import { ObjectCache } from '@sanjo/cache';
export declare function nOutOf<T>(n: number, set: Iterable<T>): Set<Set<T>>;
export declare namespace nOutOf {
    var indexSubSequencesCache: ObjectCache<number[][]>;
}
export declare function getNextSubSequenceElementStartValue(subSequence: number[]): number;
//# sourceMappingURL=nOutOf.d.ts.map