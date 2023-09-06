import { describe, expect, it } from "@jest/globals"
import { every } from "./every.js"

describe("every", () => {
  it("returns true when the predicate evaluates as true for all elements in the set", () => {
    expect(every(new Set([1, 2, 3]), (element) => element >= 1)).toEqual(true)
  })

  it("returns true when the predicate evaluates as true only for some of the elements in the set", () => {
    expect(every(new Set([1, 2, 3]), (element) => element >= 2)).toEqual(false)
  })
})
