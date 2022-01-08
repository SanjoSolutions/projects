import { parseCurrencyText } from './parseCurrencyText.js'
import { getInnerTextOfChild } from './getInnerTextOfChild.js'

export async function getInnerTextOfChildAsCurrency(pageOrElement, selector) {
  return parseCurrencyText(await getInnerTextOfChild(pageOrElement, selector))
}
