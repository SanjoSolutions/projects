import { isSmaller } from "./isSmaller.js"

describe("isSmaller", () => {
  it("returns true when first value is smaller than second value", () => {
    expect(isSmaller(1, 2)).toEqual(true)
  })

  it("returns false when first value is bigger than second value", () => {
    expect(isSmaller(2, 1)).toEqual(false)
  })

  it("returns false when first value equals second value", () => {
    expect(isSmaller(1, 1)).toEqual(false)
  })
})
