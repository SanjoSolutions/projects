"use strict";

var _Page = require("puppeteer/lib/Page.js");

describe("Page", () => {
  it("has the method $eval", () => {
    expect(typeof _Page.Page.prototype.$eval).toEqual("function");
  });
});
//# sourceMappingURL=Page.test.js.map
