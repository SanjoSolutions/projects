import { getInnerTextProperty } from './getInnerTextProperty.js'

export async function getInnerText(element) {
  return await element.evaluate(getInnerTextProperty)
}
