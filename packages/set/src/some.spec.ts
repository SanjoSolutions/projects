import { describe, expect, it } from "@jest/globals"
import { some } from "./some.js"

describe("some", () => {
  it("returns true when the predicate evaluates to true from at least some of the elements", () => {
    expect(some(new Set([1, 2]), (element) => element === 2)).toEqual(true)
  })
})
