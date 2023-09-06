import { getInnerHTMLProperty } from "./getInnerHTMLProperty.js"

export async function getInnerHTMLOfChild(pageOrElement, selector) {
  return await pageOrElement.$eval(selector, getInnerHTMLProperty)
}
