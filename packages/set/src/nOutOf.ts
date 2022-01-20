import { last } from '@sanjo/array'

export function nOutOf<T>(n: number, set: Set<T>): Set<Set<T>> {
  const elements = [...set]

  let indexSubSequences
  const length = elements.length
  if (nOutOf.indexSubSequencesCache.has(length, n)) {
    indexSubSequences = nOutOf.indexSubSequencesCache.get(length, n)!
  } else {
    indexSubSequences = getIndexSubSequences(length, n)
    nOutOf.indexSubSequencesCache.set(length, n, indexSubSequences)
  }

  return new Set(indexSubSequences.map(indexSubSequence => new Set(indexSubSequence.map(index => elements[index]))))
}

class Cache {
  private _cache = new Map<number, Map<number, number[][]>>()

  has(length: number, n: number): boolean {
    const a = this._cache.get(length)
    if (a) {
      return a.has(n)
    } else {
      return false
    }
  }

  get(length: number, n: number): number[][] | null {
    const a = this._cache.get(length)
    if (a) {
      return a.get(n) ?? null
    } else {
      return null
    }
  }

  set(length: number, n: number, item: number[][]): void {
    let a = this._cache.get(length)
    if (!a) {
      a = new Map<number, number[][]>()
      this._cache.set(length, a)
    }
    a.set(n, item)
  }

  clear(): void {
    this._cache = new Map()
  }
}

nOutOf.indexSubSequencesCache = new Cache()

function getIndexSubSequences(length: number, n: number): number[][] {
  console.log(length)
  const result: number[][] = []
  let subSequences: number[][] = [[]]
  for (let iteration = 1; iteration <= length; iteration++) {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      for (let value = subSequence.length === 0 ? 0 : last(subSequence)! + 1; value <= length - 1; value++) {
        const nextSubsequence = [...subSequence, value]
        nextSubSequences.push(nextSubsequence)
        if (nextSubsequence.length === n) {
          result.push(nextSubsequence)
        }
      }
    }
    subSequences = nextSubSequences
  }

  return result
}
