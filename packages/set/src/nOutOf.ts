import { last } from '@sanjo/array'
import { nOutOfBase } from './nOutOfBase.js'
import { Cache } from '@sanjo/cache'

export function nOutOf<T>(n: number, set: Set<T>): Set<Set<T>> {
  return nOutOfBase(n, set, nOutOf.indexSubSequencesCache, getNextSubSequenceElementStartValue)
}

nOutOf.indexSubSequencesCache = new Cache<number[][]>()

export function getNextSubSequenceElementStartValue(subSequence: number[]): number {
  return subSequence.length === 0 ? 0 : last(subSequence)! + 1
}
