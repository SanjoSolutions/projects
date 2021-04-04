import { isEqual } from "./isEqual.js";
import type { Subsequence } from "./Subsequence.js";

export function findNextToArrayIndex(
  toArray: any[],
  matchingSubsequences: Subsequence[],
  searchElement: any,
  fromIndex: number = 0
) {
  let nextToArrayIndex: number;
  let partOfMatchingSubsequences;
  do {
    nextToArrayIndex = toArray
      .slice(fromIndex)
      .findIndex((value) => isEqual(value, searchElement));
    if (nextToArrayIndex !== -1) {
      nextToArrayIndex += fromIndex;
      const matchingSubsequence = matchingSubsequences.find(
        (matchingSubsequence) =>
          matchingSubsequence[1].from <= nextToArrayIndex &&
          nextToArrayIndex < matchingSubsequence[1].to
      );
      partOfMatchingSubsequences = Boolean(matchingSubsequence);
      if (partOfMatchingSubsequences) {
        fromIndex = matchingSubsequence![1].to;
      }
    } else {
      partOfMatchingSubsequences = false;
    }
  } while (
    partOfMatchingSubsequences &&
    nextToArrayIndex !== -1 &&
    nextToArrayIndex < toArray.length
  );

  return nextToArrayIndex;
}
