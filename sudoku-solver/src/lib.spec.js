import { describe, expect, it } from '@jest/globals'
import { bruteForce, determineNextCell, getPossibleNumbers, isSolution } from './lib.js'

describe('isSolution', () => {
  it('returns true when the sudoku is solved', () => {
    expect(
      isSolution([
        [1, 5, 4, 8, 7, 3, 2, 9, 6],
        [3, 8, 6, 5, 9, 2, 7, 1, 4],
        [7, 2, 9, 6, 4, 1, 8, 3, 5],
        [8, 6, 3, 7, 2, 5, 1, 4, 9],
        [9, 7, 5, 3, 1, 4, 6, 2, 8],
        [4, 1, 2, 9, 6, 8, 3, 5, 7],
        [6, 3, 1, 4, 5, 7, 9, 8, 2],
        [5, 9, 8, 2, 3, 6, 4, 7, 1],
        [2, 4, 7, 1, 8, 9, 5, 6, 3],
      ])
    ).toEqual(true)
  })
})
