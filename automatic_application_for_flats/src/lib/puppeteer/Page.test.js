import { Page } from "puppeteer/lib/Page.js";

describe("Page", () => {
  it("has the method $eval", () => {
    expect(typeof Page.prototype.$eval).toEqual("function");
  });
});
