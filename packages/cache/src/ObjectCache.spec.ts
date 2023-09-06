import { describe, expect, it } from "@jest/globals"
import { ObjectCache } from "./ObjectCache.js"

describe("ObjectCache", () => {
  it("can cache with an object key", () => {
    const cache = new ObjectCache()
    const value = {}
    cache.set(
      {
        a: "value a",
        b: "value b",
      },
      value,
    )
    expect(
      cache.get({
        a: "value a",
        b: "value b",
      }),
    ).toBe(value)
  })

  describe("has", () => {
    it("returns true when the cache has a value for the key", () => {
      const cache = new ObjectCache()
      const value = {}
      cache.set(
        {
          a: "value a",
          b: "value b",
        },
        value,
      )
      expect(
        cache.has({
          a: "value a",
          b: "value b",
        }),
      ).toEqual(true)
    })
  })
})
