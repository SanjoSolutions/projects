import { Cache } from '@sanjo/cache';
export declare function nOutOfBase<T>(n: number, set: Set<T>, cache: Cache<number[][]>, getNextSubSequenceElementStartValue: (subSequence: number[]) => number): Set<Set<T>>;
export declare function getIndexSubSequences(length: number, n: number, getNextSubSequenceElementStartValue: (subSequence: number[]) => number): number[][];
//# sourceMappingURL=nOutOfBase.d.ts.map