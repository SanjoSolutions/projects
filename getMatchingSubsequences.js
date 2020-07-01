import { findNextToArrayIndex } from './findNextToArrayIndex.js'

export function getMatchingSubsequences (fromArray, toArray) {
  const matchingSubsequences = []
  let fromArrayIndex = 0
  while (fromArrayIndex < fromArray.length) {
    let matchingSubsequence = null  // [{from: null, to: null}, {from: null, to: null}]
    const fromArrayValue = fromArray[fromArrayIndex]

    let toArrayIndex = findNextToArrayIndex(toArray, matchingSubsequences, fromArrayValue)

    while (toArrayIndex !== -1) {
      let indexDelta = 0
      do {
        indexDelta++
      } while (
        fromArrayIndex + indexDelta < fromArray.length &&
        toArrayIndex + indexDelta < toArray.length &&
        fromArray[fromArrayIndex + indexDelta] === toArray[toArrayIndex + indexDelta]
        )
      indexDelta--
      const matchingSubsequenceLength = indexDelta + 1
      const previousMatchingSubsequenceLength = matchingSubsequence
        ? matchingSubsequence[0].to - matchingSubsequence[0].from
        : 0
      if (matchingSubsequenceLength > previousMatchingSubsequenceLength) {
        matchingSubsequence = [
          {
            from: fromArrayIndex,
            to: fromArrayIndex + matchingSubsequenceLength,
          },
          {
            from: toArrayIndex,
            to: toArrayIndex + matchingSubsequenceLength,
          },
        ]
      }

      toArrayIndex = findNextToArrayIndex(toArray, matchingSubsequences, fromArrayValue, toArrayIndex + 1)
    }
    if (matchingSubsequence) {
      matchingSubsequences.push(matchingSubsequence)
      fromArrayIndex +=
        (
          matchingSubsequence[0].to - matchingSubsequence[0].from
        )
    } else {
      fromArrayIndex++
    }
  }

  return matchingSubsequences
}
