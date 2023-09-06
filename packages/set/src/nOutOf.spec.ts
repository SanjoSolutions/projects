import { describe, expect, it } from "@jest/globals"
import { nOutOf } from "./nOutOf.js"

describe("nOutOf", () => {
  it("returns a set of sets, every one with n unique elements out of a set (1)", () => {
    expect(nOutOf(2, new Set([1, 2]))).toEqual(new Set([new Set([1, 2])]))
  })

  it("returns a set of set, every one with n unique elements out of a set (2)", () => {
    expect(nOutOf(2, new Set([1, 2, 3]))).toEqual(
      new Set([new Set([1, 2]), new Set([1, 3]), new Set([2, 3])]),
    )
  })
})
