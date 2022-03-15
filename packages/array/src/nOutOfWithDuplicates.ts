export function nOutOfWithDuplicates<T>(n: number, array: T[]): T[] {
  let sequences: any[] = [[]]
  for (let i = 1; i <= n; i++) {
    const nextSequences: any[] = []
    for (const sequence of sequences) {
      for (const element of array) {
        nextSequences.push([...sequence, element])
      }
    }
    sequences = nextSequences
  }
  return sequences
}
