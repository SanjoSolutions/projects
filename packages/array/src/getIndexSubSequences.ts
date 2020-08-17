export function getIndexSubSequences(length: number): number[][] {
  let subSequences: number[][] = [[]]
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
