// See: https://en.wikipedia.org/wiki/Set_theory#Basic_concepts_and_notation

export function includes<T>(setA: Set<T>, setB: Set<T>): boolean {
  return intersection(setA, setB).size === setB.size
}

export function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const unionSet = new Set<T>()
  for (const value of setA) {
    unionSet.add(value)
  }
  for (const value of setB) {
    unionSet.add(value)
  }
  return unionSet
}

export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter(value => setB.has(value)))
}

export function intersection2<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>()
  if (setB.size < setA.size) {
    const temp = setA
    setA = setB
    setB = temp
  }
  for (const value of setA) {
    if (setB.has(value)) {
      result.add(value)
    }
  }
  return result
}

export function copyArray1<T>(array: T[]): T[] {
  return [...array]
}

export function copyArray2<T>(array: T[]): T[] {
  return Array.from(array)
}

export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const differenceSet = new Set<T>()
  for (const value of setA) {
    if (!setB.has(value)) {
      differenceSet.add(value)
    }
  }
  return differenceSet
}

export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return difference(union(setA, setB), intersection(setA, setB))
}

export function cartesianProduct<T, U>(setA: Set<T>, setB: Set<U>): Set<[T, U]> {
  const result = new Set<[T, U]>()
  setA.forEach(valueA => setB.forEach(valueB => result.add([valueA, valueB])))
  return result
}

export function powerSet<T>(set: Set<T>): Set<Set<T>> {
  const array = [...set]
  array.sort()

  const indexSubSequences = getIndexSubSequences(array.length)

  const subSequences = indexSubSequences.map(indexSubSequence => indexSubSequence.map(index => array[index]))
  const subSets = subSequences.map(subSequence => new Set(subSequence))
  const result = new Set(subSets)

  return result
}

function getIndexSubSequences(length: number): number[][] {
  let subSequences: number[][] = [[]]
  const result = [...subSequences]
  do {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      const lastValue = subSequence.length > 0 ? subSequence[subSequence.length - 1] : -1
      for (let value = lastValue + 1; value < length; value++) {
        nextSubSequences.push([...subSequence, value])
      }
    }
    result.push(...nextSubSequences)
    subSequences = nextSubSequences
  } while (subSequences.length > 0)

  return result
}
