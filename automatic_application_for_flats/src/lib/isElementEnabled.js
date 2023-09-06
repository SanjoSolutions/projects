import { isElementDisabled } from "./isElementDisabled.js"

export async function isElementEnabled(element) {
  return !(await isElementDisabled(element))
}
