import { getInnerTextAndExtractCurrencyValueFromLabeledText } from "./getInnerTextAndExtractCurrencyValueFromLabeledText.js"

export async function getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError(
  page,
  selector,
  label,
  errorMessage,
) {
  const result = await getInnerTextAndExtractCurrencyValueFromLabeledText(
    page,
    selector,
    label,
  )
  if (!result) {
    throw new Error(errorMessage)
  }
  return result
}
