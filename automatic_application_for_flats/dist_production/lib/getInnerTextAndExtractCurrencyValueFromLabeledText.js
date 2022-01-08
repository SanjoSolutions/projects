'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getInnerTextAndExtractCurrencyValueFromLabeledText = getInnerTextAndExtractCurrencyValueFromLabeledText

var _escapeTextForRegExp = require('./escapeTextForRegExp.js')

var _getInnerTextOfChild = require('./getInnerTextOfChild.js')

var _parseCurrencyText = require('./parseCurrencyText.js')

async function getInnerTextAndExtractCurrencyValueFromLabeledText(page, selector, label) {
  const text = await (0, _getInnerTextOfChild.getInnerTextOfChild)(page, selector)
  const regExp = new RegExp(`^${(0, _escapeTextForRegExp.escapeTextForRegExp)(label)}: (.+)$`)
  const result = regExp.exec(text)
  return result ? (0, _parseCurrencyText.parseCurrencyText)(result[1]) : null
}
//# sourceMappingURL=getInnerTextAndExtractCurrencyValueFromLabeledText.js.map
