import { getSuitValue } from "./getSuitValue.js"

describe("getSuitValue", () => {
  const suitToSuitValue = new Map([
    ["h", 0],
    ["c", 1],
    ["s", 2],
    ["d", 3],
  ])

  for (const [suit, suitValue] of suitToSuitValue) {
    it(`suit "${suit}" maps to suit value ${suitValue}`, () => {
      expect(getSuitValue(suit)).toEqual(suitValue)
    })
  }
})
