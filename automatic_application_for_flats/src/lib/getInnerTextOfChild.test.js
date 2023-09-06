import { createBrowser } from "./createBrowser.js"
import { getInnerTextOfChild } from "./getInnerTextOfChild.js"
import { createFlatOfferElement } from "./fixtures/createFlatOfferElement.js"

let browser

beforeAll(async () => {
  browser = await createBrowser()
})

afterAll(async () => {
  await browser.close()
})

describe("getInnerTextOfChild", () => {
  it("returns the innerText of the child of the element that matches the selector", async () => {
    const element = await createFlatOfferElement(browser)

    const innerText = await getInnerTextOfChild(element, ".flat-offer__title")

    expect(innerText).toEqual("Title")
  })
})
