export async function getFlatOfferElements (page, flatOfferElementsSelector) {
  return await page.$$(flatOfferElementsSelector)
}
