import { describe, it, expect } from "@jest/globals"
import { isLogLine } from "./isLogLine.js"

describe("isLogLine", () => {
  it('returns true for lines that start with "Log"', () => {
    expect(isLogLine('Log.d("Login Activity")')).toEqual(true)
  })

  it('returns true for lines that start with a commented "Log', () => {
    expect(isLogLine('\t //\t Log.d("Login Activity")')).toEqual(true)
  })

  it('returns false if line does not start with "Log"', () => {
    expect(isLogLine("System")).toEqual(false)
  })

  it('returns false if line does not start with "Log" but includes "Log"', () => {
    expect(isLogLine('print("Log")')).toEqual(false)
  })
})
