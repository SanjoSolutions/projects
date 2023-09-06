import { describe, expect, test } from "@jest/globals"
import { ObjectDiff, objectDiff } from "./objectDiff.js"

describe("objectDiff", () => {
  objectDiffTest({ a: 1 }, { b: 2 }, [
    { type: "remove", key: ["a"] },
    { type: "add", key: ["b"], value: 2 },
  ])

  objectDiffTest({ a: { b: [1] } }, { a: { b: [2] } }, [
    { type: "update", key: ["a", "b"], index: 0, value: 2 },
  ])

  objectDiffTest({ a: { b: 1 } }, { a: { b: [2] } }, [
    { type: "update", key: ["a", "b"], value: [2] },
  ])

  objectDiffTest({ a: { b: 1 } }, { a: { b: 2 } }, [
    { type: "update", key: ["a", "b"], value: 2 },
  ])

  function objectDiffTest(
    from: { [key: string]: any },
    to: { [key: string]: any },
    expectedResult: ObjectDiff,
  ) {
    test(`objectDiff from "${JSON.stringify(from)}" to "${JSON.stringify(
      to,
    )}`, () => {
      const result = objectDiff(from, to)
      expect(result).toEqual(expectedResult)
    })
  }
})
