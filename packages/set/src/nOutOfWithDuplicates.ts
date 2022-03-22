import { last } from '@sanjo/array'
import { nOutOfBase } from './nOutOfBase.js'
import { ObjectCache } from '@sanjo/cache'

export function nOutOfWithDuplicates<T>(n: number, set: Iterable<T>): Set<Set<T>> {
  return nOutOfBase(n, set, nOutOfWithDuplicates.indexSubSequencesCache, getNextSubSequenceElementStartValue)
}

nOutOfWithDuplicates.indexSubSequencesCache = new ObjectCache<number[][]>()

export function getNextSubSequenceElementStartValue(subSequence: number[]): number {
  return subSequence.length === 0 ? 0 : last(subSequence)!
}
