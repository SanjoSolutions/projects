import { identity } from './identity.js'
import { isBigger } from './isBigger.js'
import { isSmaller } from './isSmaller.js'
import { plus } from './plus.js'

export function sum (array) {
  return array.reduce(plus)
}

export function max (array, getter = identity) {
  return getExtrema(array, getter, isBigger)
}

export function min (array, getter = identity) {
  return getExtrema(array, getter, isSmaller)
}

function getExtrema (array, getter = identity, isMoreExtreme) {
  if (array.length === 0) {
    return null
  }

  let extremeIndex = 0
  let extremeValue = getter(array[0])
  for (let index = 1; index < array.length; index++) {
    const value = getter(array[index])
    if (isMoreExtreme(value, extremeValue)) {
      extremeIndex = index
      extremeValue = value
    }
  }

  return array[extremeIndex]
}

export function concat (...arrays) {
  return [].concat(...arrays)
}

export function combinations (setOrArray) {
  const array = [...setOrArray]

  let indexSubSequences
  const length = array.length
  if (combinations.indexSubSequencesCache.has(length)) {
    indexSubSequences = combinations.indexSubSequencesCache.get(length)
  } else {
    indexSubSequences = getIndexSubSequences(array.length)
    combinations.indexSubSequencesCache.set(length, indexSubSequences)
  }

  const subSequences = indexSubSequences.map(
    indexSubSequence => indexSubSequence.map(index => array[index]),
  )

  return subSequences
}

combinations.indexSubSequencesCache = new Map()

function getIndexSubSequences (length) {
  let subSequences = [[]]
  for (let iteration = 1; iteration <= length; iteration++) {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      for (let value = 0; value <= length - 1; value++) {
        if (!subSequence.includes(value)) {
          nextSubSequences.push([...subSequence, value])
        }
      }
    }
    subSequences = nextSubSequences
  }

  return subSequences
}

export function _ (array) {
  return new ExtendedArray(...array)
}

export class ExtendedArray extends Array {
  sum () {
    return sum(this)
  }

  max () {
    return max(this)
  }

  min () {
    return min(this)
  }
}
