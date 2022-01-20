import { last } from '@sanjo/array'
import { nOutOfBase } from './nOutOfBase.js'
import { NOutOfCache } from './NOutOfCache.js'

export function nOutOfWithDuplicates<T>(n: number, set: Set<T>): Set<Set<T>> {
  return nOutOfBase(n, set, nOutOfWithDuplicates.indexSubSequencesCache, getNextSubSequenceElementStartValue)
}

nOutOfWithDuplicates.indexSubSequencesCache = new NOutOfCache()

export function getNextSubSequenceElementStartValue(subSequence: number[]): number {
  return subSequence.length === 0 ? 0 : last(subSequence)!
}
