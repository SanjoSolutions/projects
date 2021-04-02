import { getRank } from "./getRank.js"

describe("getRank", () => {
  it('returns rank "4" for card "4s"', () => {
    expect(getRank("4s")).toEqual("4")
  })

  it('returns rank "5" for card "5s"', () => {
    expect(getRank("5s")).toEqual("5")
  })
})
