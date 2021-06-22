"use strict";

var _parseCurrencyText = require("./parseCurrencyText.js");

describe("parseCurrencyText", () => {
  it("returns currency as float", () => {
    const currencyText = "12,34 €";
    const currency = (0, _parseCurrencyText.parseCurrencyText)(currencyText);
    expect(currency).toEqual(12.34);
  });
});
//# sourceMappingURL=parseCurrencyText.test.js.map
