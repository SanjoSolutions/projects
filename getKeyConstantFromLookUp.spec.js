import { describe, it, expect } from "@jest/globals"
import { StringValueNotFoundError } from "./StringValueNotFoundError.js"
import { getKeyConstantFromLookUp } from "./getKeyConstantFromLookUp.js"

describe("getKeyConstantFromLookUp", () => {
  it('returns "lgn_act" for string value "Login Activity"', () => {
    const lookUp = new Map([["Login Activity", "lgn_act"]])
    expect(getKeyConstantFromLookUp(lookUp, "Login Activity")).toEqual(
      "lgn_act",
    )
  })

  it('returns "rgst_me" for string value "Register Me Too"', () => {
    const lookUp = new Map([["Register Me Too", "rgst_me"]])
    expect(getKeyConstantFromLookUp(lookUp, "Register Me Too")).toEqual(
      "rgst_me",
    )
  })

  describe("when the string value does not exist in the look-up", () => {
    it("throws an StringValueNotFoundError", () => {
      const lookUp = new Map([])
      expect(() =>
        getKeyConstantFromLookUp(lookUp, "Some string"),
      ).toThrowError(
        new StringValueNotFoundError(
          'String value "Some string" has not been found in look-up.',
        ),
      )
    })
  })
})
