import { describe, it, expect } from "@jest/globals"
import { first } from "./first.js"

describe("first", () => {
  it("returns the first element", () => {
    expect(first([1, 2])).toEqual(1)
  })

  describe("when the array has a length of 0", () => {
    it("returns null", () => {
      expect(first([])).toEqual(null)
    })
  })
})
