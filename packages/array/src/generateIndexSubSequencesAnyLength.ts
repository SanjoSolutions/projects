export function generateIndexSubSequencesAnyLength(
  maxLength: number,
): number[][] {
  let sequences: number[][] = [[]]
  let subSequences: number[][] = [[]]
  for (let iteration = 1; iteration <= maxLength; iteration++) {
    const nextSubSequences = []
    for (const subSequence of subSequences) {
      for (let value = 0; value <= maxLength - 1; value++) {
        if (!subSequence.includes(value)) {
          nextSubSequences.push([...subSequence, value])
        }
      }
    }
    subSequences = nextSubSequences
    sequences = sequences.concat(subSequences)
  }

  return sequences
}
