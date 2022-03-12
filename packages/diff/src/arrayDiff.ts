import type { ArrayOperation } from './ArrayOperation.js'
import { concat } from './concat.js'
import { getDiffSubsequences } from './getDiffSubsequences.js'
import { getMatchingSubsequences } from './getMatchingSubsequences.js'
import { getOperationsForDiffSubsequence } from './getOperationsForDiffSubsequence.js'
import type { ObjectOperation } from './ObjectOperation.js'

export function arrayDiff(fromArray: any[], toArray: any[]): (ArrayOperation | ObjectOperation)[] {
  const matchingSubsequences = getMatchingSubsequences(fromArray, toArray)
  const diffSubsequences = getDiffSubsequences(fromArray, toArray, matchingSubsequences)
  const operations = concat(...diffSubsequences.map(getOperationsForDiffSubsequence.bind(null, fromArray, toArray)))
  return operations
}
