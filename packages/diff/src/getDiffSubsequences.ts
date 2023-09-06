import type { Subsequence } from "./Subsequence.js"

export function getDiffSubsequences(
  fromArray: any[],
  toArray: any[],
  matchingSubsequences: Subsequence[],
): Subsequence[] {
  const diffSubsequences: Subsequence[] = []

  if (matchingSubsequences.length === 0) {
    diffSubsequences.push([
      { from: 0, to: fromArray.length },
      { from: 0, to: toArray.length },
    ])
  } else {
    const firstMatchingSubsequence = matchingSubsequences[0]
    if (
      firstMatchingSubsequence[0].from > 0 ||
      firstMatchingSubsequence[1].from > 0
    ) {
      diffSubsequences.push([
        { from: 0, to: firstMatchingSubsequence[0].from },
        { from: 0, to: firstMatchingSubsequence[1].from },
      ])
    }

    for (let index = 1; index < matchingSubsequences.length; index++) {
      const previousMatchingSubsequence = matchingSubsequences[index - 1]
      const currentMatchingSubsequence = matchingSubsequences[index]
      diffSubsequences.push([
        {
          from: previousMatchingSubsequence[0].to,
          to: currentMatchingSubsequence[0].from,
        },
        {
          from: previousMatchingSubsequence[1].to,
          to: currentMatchingSubsequence[1].from,
        },
      ])
    }

    const lastMatchingSubsequence =
      matchingSubsequences[matchingSubsequences.length - 1]
    if (
      lastMatchingSubsequence[0].to < fromArray.length ||
      lastMatchingSubsequence[1].to < toArray.length
    ) {
      diffSubsequences.push([
        { from: lastMatchingSubsequence[0].to, to: fromArray.length },
        { from: lastMatchingSubsequence[1].to, to: toArray.length },
      ])
    }
  }

  return diffSubsequences
}
