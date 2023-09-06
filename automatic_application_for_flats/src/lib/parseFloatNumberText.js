export function parseFloatNumberText(floatNumberText) {
  return parseFloat(floatNumberText.replace(/\./, "").replace(",", "."))
}
