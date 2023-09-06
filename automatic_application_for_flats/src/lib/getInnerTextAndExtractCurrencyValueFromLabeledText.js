import { escapeTextForRegExp } from "./escapeTextForRegExp.js"
import { getInnerTextOfChild } from "./getInnerTextOfChild.js"
import { parseCurrencyText } from "./parseCurrencyText.js"

export async function getInnerTextAndExtractCurrencyValueFromLabeledText(
  page,
  selector,
  label,
) {
  const text = await getInnerTextOfChild(page, selector)
  const regExp = new RegExp(`^${escapeTextForRegExp(label)}: (.+)$`)
  const result = regExp.exec(text)
  return result ? parseCurrencyText(result[1]) : null
}
