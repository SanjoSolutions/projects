import { describe, expect, it } from "@jest/globals"
import { powerSet } from "./powerSet.js"

describe("powerSet", () => {
  it("returns the power set", () => {
    const a = new Set([1, 2])
    const result = powerSet(a)
    expect(result).toEqual(
      new Set([new Set(), new Set([1]), new Set([2]), new Set([1, 2])]),
    )
  })
})
