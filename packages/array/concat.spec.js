import { concat } from "./concat.js"

describe("concat", () => {
  it("concatenates multiple arrays", () => {
    expect(concat([1, 2], [3], [4, 5])).toEqual([1, 2, 3, 4, 5])
  })
})
