import { NOutOfCache } from './NOutOfCache.js'

export function nOutOfBase<T>(
  n: number,
  set: Set<T>,
  cache: NOutOfCache,
  getNextSubSequenceElementStartValue: (subSequence: number[]) => number
): Set<Set<T>> {
  const elements = [...set]

  let indexSubSequences
  const length = elements.length
  if (cache.has(length, n)) {
    indexSubSequences = cache.get(length, n)!
  } else {
    indexSubSequences = getIndexSubSequences(length, n, getNextSubSequenceElementStartValue)
    cache.set(length, n, indexSubSequences)
  }

  return new Set(indexSubSequences.map(indexSubSequence => new Set(indexSubSequence.map(index => elements[index]))))
}

export function getIndexSubSequences(
  length: number,
  n: number,
  getNextSubSequenceElementStartValue: (subSequence: number[]) => number
): number[][] {
  const result: number[][] = []
  let subSequences: number[][] = [[]]
  for (let iteration = 1; iteration <= length; iteration++) {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      for (let value = getNextSubSequenceElementStartValue(subSequence); value <= length - 1; value++) {
        const nextSubsequence = [...subSequence, value]
        nextSubSequences.push(nextSubsequence)
        if (nextSubsequence.length === n) {
          result.push(nextSubsequence)
        }
      }
    }
    subSequences = nextSubSequences
  }

  return result
}
