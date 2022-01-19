import { getIndexSubSequences } from './getIndexSubSequences.js'

export function powerSet<T>(set: Set<T>): Set<Set<T>> {
  const array = [...set]
  array.sort()

  const indexSubSequences = getIndexSubSequences(array.length)

  const subSequences = indexSubSequences.map(indexSubSequence => indexSubSequence.map(index => array[index]))
  const subSets = subSequences.map(subSequence => new Set(subSequence))
  const result = new Set(subSets)

  return result
}
