import { a } from "./a.js"
import * as moduleB from "./b.js"

describe("spy imported function", () => {
  test("spy imported function", () => {
    jest.spyOn(moduleB, "b").mockImplementation(() => {
      return "mocked!"
    })

    expect(a()).toEqual("mocked!")
  })
})
