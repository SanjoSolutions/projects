import { last } from '@sanjo/array'
import { nOutOfBase } from './nOutOfBase.js'
import { NOutOfCache } from './NOutOfCache.js'

export function nOutOf<T>(n: number, set: Set<T>): Set<Set<T>> {
  return nOutOfBase(n, set, nOutOf.indexSubSequencesCache, getNextSubSequenceElementStartValue)
}

nOutOf.indexSubSequencesCache = new NOutOfCache()

export function getNextSubSequenceElementStartValue(subSequence: number[]): number {
  return subSequence.length === 0 ? 0 : last(subSequence)! + 1
}
