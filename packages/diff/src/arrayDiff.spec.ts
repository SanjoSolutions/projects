import { arrayDiff } from './arrayDiff'

describe('arrayDiff', () => {
  arrayDiffTest(
    [],
    [1],
    [{ type: 'add', index: 0, values: [1] }],
  )

  arrayDiffTest(
    [1],
    [],
    [{ type: 'remove', index: 0, deleteCount: 1 }],
  )

  arrayDiffTest(
    [1],
    [2],
    [{ type: 'update', index: 0, value: 2 }],
  )

  arrayDiffTest(
    [1, 2, 9, 3, 4, 5],
    [1, 2, 8, 7, 3, 4, 5],
    [
      { type: 'update', index: 2, value: 8 },
      { type: 'add', index: 3, values: [7] },
    ],
  )

  function arrayDiffTest (from, to, expectedResult) {
    test(`arrayDiff from "${JSON.stringify(from)}" to "${JSON.stringify(to)}`, () => {
      const result = arrayDiff(from, to)
      expect(result).toEqual(expectedResult)
    })
  }
})
