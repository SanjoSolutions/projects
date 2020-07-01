import { arrayDiff } from './arrayDiff.js'
import { isObject } from './isObject.js'
import { objectDiff } from './objectDiff.js'

export function getOperationsForDiffSubsequence (fromArray, toArray, subsequence) {
  const fromSubsequence = fromArray.slice(subsequence[0].from, subsequence[0].to)
  const toSubsequence = toArray.slice(subsequence[1].from, subsequence[1].to)
  const fromArrayMaxIndex = fromSubsequence.length - 1
  const toArrayMaxIndex = toSubsequence.length - 1
  const maxIndex = Math.max(fromArrayMaxIndex, toArrayMaxIndex)
  const operations = []
  for (let index = 0; index <= maxIndex; index++) {
    // when index value in fromArray missing then add operation
    if (index > fromArrayMaxIndex) {
      const operation = {
        type: 'add',
        index: subsequence[0].from + index,
        values: toSubsequence.slice(index),
      }
      operations.push(operation)
      break
    }
    // when index value in toArray missing then remove operation
    else if (index > toArrayMaxIndex) {
      const operation = {
        type: 'remove',
        index: subsequence[0].from + index,
        deleteCount: fromArrayMaxIndex - toArrayMaxIndex,
      }
      operations.push(operation)
      break
    }
    // when index values different then update operation
    else {
      const fromValue = fromSubsequence[index]
      const toValue = toSubsequence[index]
      if (isObject(fromValue) && isObject(toValue)) {
        operations.push(...objectDiff(fromValue, toValue))
      } else if (Array.isArray(fromValue) && Array.isArray(toValue)) {
        operations.push(...arrayDiff(fromValue, toValue))
      } else {
        const operation = {
          type: 'update',
          index: subsequence[0].from + index,
          value: toValue,
        }
        operations.push(operation)
      }
    }
  }

  return operations
}
