import { describe, expect, test } from "@jest/globals"
import { Card } from "./Card.js"

describe("Card", () => {
  test("constructing a card", () => {
    const card = new Card()
    expect(card).toBeInstanceOf(Card)
  })
})
