import { describe, it, expect } from "@jest/globals"
import { without } from "./without.js"

describe("without", () => {
  it("returns the set without the elements of other sets", () => {
    expect(without(new Set([1, 2, 3]), new Set([2]), new Set([3]))).toEqual(
      new Set([1]),
    )
  })
})
