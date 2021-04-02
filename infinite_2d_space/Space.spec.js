import { describe, it } from "@jest/globals"
import { Space } from "./Space.js"
import { Viewport } from "./Viewport.js"

describe("Space", () => {
  describe("get", () => {
    it("returns false for coordinate outside of the viewport", () => {
      const viewport = new Viewport({
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      })
      const space = new Space(viewport)
      space.set({ x: 0, y: 0 }, true)
      expect(space.get({ x: 0, y: 0 })).toEqual(true)
      expect(space.get({ x: 1, y: 0 })).toEqual(false)
      expect(space.get({ x: -1, y: 0 })).toEqual(false)
    })
  })
})
