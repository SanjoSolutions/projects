import { describe, expect, it } from "@jest/globals"
import { combinationsAnyLength } from "./combinationsAnyLength.js"

describe("combinationsAnyLength", () => {
  it("returns all combinations", () => {
    expect(combinationsAnyLength([1, 2, 3])).toEqual([
      [],
      [1],
      [2],
      [3],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  })
})
