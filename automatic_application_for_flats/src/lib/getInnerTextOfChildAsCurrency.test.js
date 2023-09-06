import { createBrowser } from "./createBrowser.js"
import { getInnerTextOfChildAsCurrency } from "./getInnerTextOfChildAsCurrency.js"
import { createFlatOfferElement } from "./fixtures/createFlatOfferElement.js"

let browser

beforeAll(async () => {
  browser = await createBrowser()
})

afterAll(async () => {
  await browser.close()
})

describe("getInnerTextOfChildAsCurrency", () => {
  it("returns innerText of child of the element matching the selector as currency", async () => {
    const element = await createFlatOfferElement(browser)

    const coldRent = await getInnerTextOfChildAsCurrency(
      element,
      ".flat-offer__cold-rent-value",
    )

    expect(coldRent).toEqual(12.34)
  })
})
