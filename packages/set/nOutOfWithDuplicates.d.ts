import { Cache } from '@sanjo/cache';
export declare function nOutOfWithDuplicates<T>(n: number, set: Iterable<T>): Set<Set<T>>;
export declare namespace nOutOfWithDuplicates {
    var indexSubSequencesCache: Cache<number[][]>;
}
export declare function getNextSubSequenceElementStartValue(subSequence: number[]): number;
//# sourceMappingURL=nOutOfWithDuplicates.d.ts.map