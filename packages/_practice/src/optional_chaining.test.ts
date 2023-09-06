import { describe, test, expect } from "@jest/globals"

describe("optional chaining", () => {
  test("", () => {
    const object = {
      a: {
        b: {
          c: "1",
        },
      },
    }

    expect(object?.a?.b?.c).toEqual("1")
  })
})
