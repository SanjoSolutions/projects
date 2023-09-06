export function getIndexSubSequences(length: number): number[][] {
  let subSequences: number[][] = [[]]
  const result = [...subSequences]
  do {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      const lastValue =
        subSequence.length > 0 ? subSequence[subSequence.length - 1] : -1
      for (let value = lastValue + 1; value < length; value++) {
        nextSubSequences.push([...subSequence, value])
      }
    }
    result.push(...nextSubSequences)
    subSequences = nextSubSequences
  } while (subSequences.length > 0)

  return result
}
