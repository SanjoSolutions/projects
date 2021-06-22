import { createBrowser } from "./createBrowser.js";
import { createPageWithHTML } from "./createPageWithHTML.js";
import { getInnerText } from "./getInnerText.js";

let browser;

beforeAll(async () => {
  browser = await createBrowser();
});

afterAll(async () => {
  await browser.close();
});

describe("getInnerText", () => {
  it("returns the innerText of the element", async () => {
    const expectedInnerText = "test";
    const page = await createPageWithHTML(
      browser,
      `<div><p>${expectedInnerText}</p></div>`
    );

    const element = await page.$("div");
    const innerText = await getInnerText(element);

    expect(innerText).toEqual(expectedInnerText);
  });
});
