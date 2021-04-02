import { describe, it } from "@jest/globals"
import { createSendPixelsToServerPaket } from "./client.js"
import { pixelPaketToArray } from "./pixelPaketToArray.js"

describe("pixelPaketToArray", () => {
  it("converts a pixel paket to an array", () => {
    const pixels = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]
    const pixelPaket = createSendPixelsToServerPaket(pixels)
    const pixelPaketArray = pixelPaketToArray(pixelPaket)
    expect(pixelPaketArray).toEqual([0, 2, 1, 2, 3, 4])
  })
})
