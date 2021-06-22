import { getInnerHTMLProperty } from "./getInnerHTMLProperty.js";

export async function getInnerHTML(element) {
  return await element.evaluate(getInnerHTMLProperty);
}
