"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError = getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError;

var _getInnerTextAndExtractCurrencyValueFromLabeledText = require("./getInnerTextAndExtractCurrencyValueFromLabeledText.js");

async function getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError(
  page,
  selector,
  label,
  errorMessage
) {
  const result = await (0,
  _getInnerTextAndExtractCurrencyValueFromLabeledText.getInnerTextAndExtractCurrencyValueFromLabeledText)(
    page,
    selector,
    label
  );

  if (!result) {
    throw new Error(errorMessage);
  }

  return result;
}
//# sourceMappingURL=getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError.js.map
