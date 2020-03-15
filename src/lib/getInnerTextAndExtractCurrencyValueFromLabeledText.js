import { escapeTextForRegExp } from './escapeTextForRegExp.js'
import { parseCurrencyText } from './parseCurrencyText.js'

export async function getInnerTextAndExtractCurrencyValueFromLabeledText (page, selector, label) {
  const text = await page.getInnerText(selector)
  const regExp = new RegExp(`^${escapeTextForRegExp(label)}: (.+)$`)
  const result = regExp.exec(text)
  return result ? parseCurrencyText(result[1]) : null
}
