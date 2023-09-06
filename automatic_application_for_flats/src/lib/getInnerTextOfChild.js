import { getInnerTextProperty } from "./getInnerTextProperty.js"

export async function getInnerTextOfChild(pageOrElement, selector) {
  return await pageOrElement.$eval(selector, getInnerTextProperty)
}
