import { describe, expect, it } from "@jest/globals"
import { combinations } from "./combinations.js"

describe("combinations", () => {
  it("returns all combinations", () => {
    expect(combinations([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  })
})
