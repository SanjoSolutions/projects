import { type as typeIntoInput } from "../type.js"

export async function type({ form, page }, selector, text) {
  return await typeIntoInput(form, selector, text)
}
