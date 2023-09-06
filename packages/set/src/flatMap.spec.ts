import { describe, expect, it } from "@jest/globals"
import { flatMap } from "./flatMap.js"

describe("flatMap", () => {
  it("flat maps", () => {
    expect(
      flatMap(new Set([1]), (element) => new Set([element * 2, element * 3])),
    ).toEqual(new Set([2, 3]))
  })
})
