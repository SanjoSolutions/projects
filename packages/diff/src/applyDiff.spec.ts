import { applyDiff } from './applyDiff.js'
import { ObjectDiff } from './objectDiff.js'

describe('applyDiff', () => {
  applyDiffTest(
    { a: 1 },
    [
      { type: 'remove', key: ['a'] },
      { type: 'add', key: ['b'], value: 2 },
    ],
    { b: 2 }
  )

  function applyDiffTest(from: any, diffToApply: ObjectDiff, expectedResult: any) {
    test(`applyDiff from "${JSON.stringify(from)}" with diffToApply "${JSON.stringify(diffToApply)}`, () => {
      const result = applyDiff(from, diffToApply)
      expect(result).toEqual(expectedResult)
    })
  }
})
