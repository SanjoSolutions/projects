import { describe, it, expect } from "@jest/globals"

function humanToCamelCase(string) {
  const words = string.split(" ")
  return (
    words[0] +
    words.slice(1).map(function capitalizeFirstLetter(word) {
      return word[0].toUpperCase() + word.substring(1)
    })
  )
}

describe("humanToCamelCase", () => {
  it("transforms a human string to a camel case string", () => {
    expect(humanToCamelCase("hello world")).toEqual("helloWorld")
  })
})
