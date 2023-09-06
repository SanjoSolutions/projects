import { isStraightFlush } from "./isStraightFlush.js"

describe("isStraightFlush", () => {
  it("5s 6s 7s 8s 9s is a straight flush", () => {
    expect(isStraightFlush(new Set(["5s", "6s", "7s", "8s", "9s"]))).toEqual(
      true,
    )
  })

  it("5s 6s 7s 8s Ts is not a straight flush", () => {
    expect(isStraightFlush(new Set(["5s", "6s", "7s", "8s", "Ts"]))).toEqual(
      false,
    )
  })
})
