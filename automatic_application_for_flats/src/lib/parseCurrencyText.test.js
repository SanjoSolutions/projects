import { parseCurrencyText } from "./parseCurrencyText.js";

describe("parseCurrencyText", () => {
  it("returns currency as float", () => {
    const currencyText = "12,34 €";

    const currency = parseCurrencyText(currencyText);

    expect(currency).toEqual(12.34);
  });
});
