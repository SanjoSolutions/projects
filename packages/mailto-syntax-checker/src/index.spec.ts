import { describe, expect, it } from "@jest/globals"
import { checkSyntax } from "./index.js"

describe("checkSyntax", () => {
  it("checks the syntax of a mailto URI", () => {
    expect(() => checkSyntax("mail:jon.doe@example.com")).toThrowError(
      'Mailto URIs start with "mailto:".',
    )
  })

  it("checks if all email addresses are valid", () => {
    expect(() => checkSyntax("mailto:joe.doe")).toThrowError(
      '"joe.doe" is an invalid email address.',
    )
  })
})
