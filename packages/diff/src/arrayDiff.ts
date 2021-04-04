import { ArrayOperation } from "./ArrayOperation";
import { concat } from "./concat";
import { getDiffSubsequences } from "./getDiffSubsequences";
import { getMatchingSubsequences } from "./getMatchingSubsequences";
import { getOperationsForDiffSubsequence } from "./getOperationsForDiffSubsequence";
import { ObjectOperation } from "./ObjectOperation";

export function arrayDiff(
  fromArray: any[],
  toArray: any[]
): (ArrayOperation | ObjectOperation)[] {
  const matchingSubsequences = getMatchingSubsequences(fromArray, toArray);
  const diffSubsequences = getDiffSubsequences(
    fromArray,
    toArray,
    matchingSubsequences
  );
  const operations = concat(
    ...diffSubsequences.map(
      getOperationsForDiffSubsequence.bind(null, fromArray, toArray)
    )
  );
  return operations;
}
