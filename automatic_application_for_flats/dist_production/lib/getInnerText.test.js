"use strict";

var _createBrowser = require("./createBrowser.js");

var _createPageWithHTML = require("./createPageWithHTML.js");

var _getInnerText = require("./getInnerText.js");

let browser;
beforeAll(async () => {
  browser = await (0, _createBrowser.createBrowser)();
});
afterAll(async () => {
  await browser.close();
});
describe("getInnerText", () => {
  it("returns the innerText of the element", async () => {
    const expectedInnerText = "test";
    const page = await (0, _createPageWithHTML.createPageWithHTML)(
      browser,
      `<div><p>${expectedInnerText}</p></div>`
    );
    const element = await page.$("div");
    const innerText = await (0, _getInnerText.getInnerText)(element);
    expect(innerText).toEqual(expectedInnerText);
  });
});
//# sourceMappingURL=getInnerText.test.js.map
