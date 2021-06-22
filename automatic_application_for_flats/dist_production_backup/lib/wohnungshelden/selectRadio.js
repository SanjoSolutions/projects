"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.selectRadio = selectRadio;

async function selectRadio({ form, page }, elementOrSelector, optionIndex) {
  const radioGroup =
    typeof elementOrSelector === "string"
      ? await form.$(elementOrSelector)
      : elementOrSelector;
  await radioGroup.evaluate(
    (node, optionIndex) => node.children[optionIndex].click(),
    optionIndex
  );
}
//# sourceMappingURL=selectRadio.js.map
