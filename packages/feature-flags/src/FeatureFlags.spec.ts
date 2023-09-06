import { describe, expect, it, test } from "@jest/globals"
import { FeatureFlags } from "./FeatureFlags.js"

describe("FeatureFlags", () => {
  describe("instantiation", () => {
    describe("feature flags can be passed to the constructor", () => {
      test("as object", () => {
        const featureFlags = createFeatureFlags()
        expect(featureFlags.isEnabled("featureFlag1")).toEqual(true)
        expect(featureFlags.isDisabled("featureFlag2")).toEqual(true)
      })
    })
  })

  describe("isEnabled", () => {
    describe("when calling with a feature flag that has not been set", () => {
      it("throws an error that the feature flag has not been set", () => {
        const featureFlags = new FeatureFlags({})
        const featureFlag1 = "featureFlag1"
        expect(() => {
          return featureFlags.isEnabled(featureFlag1)
        }).toThrowError(`Feature flag "${featureFlag1}" has not been set.`)
      })
    })
  })

  describe("toObject", () => {
    it("returns the feature flags as an object", () => {
      const featureFlags = createFeatureFlags()

      expect(featureFlags.toObject()).toEqual({
        featureFlag1: true,
        featureFlag2: false,
      })
    })
  })
})

function createFeatureFlags(): FeatureFlags {
  return new FeatureFlags({
    featureFlag1: true,
    featureFlag2: false,
  })
}
