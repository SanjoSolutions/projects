import { hasFetchedFlatOffer, registerFlatOfferAsFetched } from '../fetchedFlatOffers.js'

export function createFetchOnce ({
  flatOffersUrl,
  flatOfferElementsSelector,
  parseFlatOfferUrl,
  parseFlatOffer,
  navigateToNextPage
}) {
  return async function fetchOnce (getBrowser, page, onFlatOffer) {
    await page.goto(flatOffersUrl)
    let hasNavigatedToNextPage
    do {
      const flatOfferElements = await page.$$(flatOfferElementsSelector)
      for (const flatOfferElement of flatOfferElements) {
        const url = await parseFlatOfferUrl(flatOfferElement)
        if (!await hasFetchedFlatOffer(url)) {
          const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
          onFlatOffer(flatOffer).then(async () => {
            await registerFlatOfferAsFetched(url)
          })
        }
      }
      hasNavigatedToNextPage = await navigateToNextPage(page)
    } while (hasNavigatedToNextPage)
  }
}
