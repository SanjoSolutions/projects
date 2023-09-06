import { describe, expect, it } from "@jest/globals"
import { map } from "./map.js"

describe("map", () => {
  it("maps the elements of a set", () => {
    expect(map(new Set([1, 2, 3]), (element) => element * 2)).toEqual(
      new Set([2, 4, 6]),
    )
  })
})
