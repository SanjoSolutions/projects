import { concat } from './concat.js'
import { getDiffSubsequences } from './getDiffSubsequences.js'
import { getMatchingSubsequences } from './getMatchingSubsequences.js'
import { getOperationsForDiffSubsequence } from './getOperationsForDiffSubsequence.js'
export function arrayDiff(fromArray, toArray) {
  const matchingSubsequences = getMatchingSubsequences(fromArray, toArray)
  const diffSubsequences = getDiffSubsequences(fromArray, toArray, matchingSubsequences)
  const operations = concat(...diffSubsequences.map(getOperationsForDiffSubsequence.bind(null, fromArray, toArray)))
  return operations
}
//# sourceMappingURL=arrayDiff.js.map
