import { generateIndexSubSequencesAnyLength } from "./generateIndexSubSequencesAnyLength.js"

export function combinationsAnyLength<T>(setOrArray: Set<T> | T[]): T[][] {
  const array = [...setOrArray]

  let indexSubSequences
  const length = array.length
  if (combinationsAnyLength.indexSubSequencesCache.has(length)) {
    indexSubSequences =
      combinationsAnyLength.indexSubSequencesCache.get(length)!
  } else {
    indexSubSequences = generateIndexSubSequencesAnyLength(length)
    combinationsAnyLength.indexSubSequencesCache.set(length, indexSubSequences)
  }

  const subSequences = indexSubSequences.map((indexSubSequence) =>
    indexSubSequence.map((index) => array[index]),
  )

  return subSequences
}

combinationsAnyLength.indexSubSequencesCache = new Map<number, number[][]>()
