import type { ObjectCache } from '@sanjo/cache';
export declare function nOutOfBase<T>(n: number, set: Iterable<T>, cache: ObjectCache<number[][]>, getNextSubSequenceElementStartValue: (subSequence: number[]) => number): Set<Set<T>>;
export declare function getIndexSubSequences(length: number, n: number, getNextSubSequenceElementStartValue: (subSequence: number[]) => number): number[][];
//# sourceMappingURL=nOutOfBase.d.ts.map