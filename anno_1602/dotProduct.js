export function dotProduct(A, B) {
  const n = A[0].length
  const m = A.length
  const p = B[0].length
  const q = B.length
  const C = new Array(q)
  if (m !== p) {
    throw new Error(
      "The number of columns of A needs to equal the number of rows of B."
    )
  }
  for (let column = 0; column < n; column++) {
    C[column] = new Array(q)
  }
  for (let rowA = 0; rowA < n; rowA++) {
    for (let columnB = 0; columnB < q; columnB++) {
      let sum = 0
      for (let index = 0; index < m; index++) {
        sum += A[index][rowA] * B[columnB][index]
      }
      C[columnB][rowA] = sum
    }
  }
  return C
}
