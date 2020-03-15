import { hasFetchedFlatOffer, registerFlatOfferAsFetched } from '../fetchedFlatOffers.js'
import { navigateToFlatOfferListPage } from './navigateToFlatOfferListPage.js'

export function createFetchOnce ({
  flatOffersUrl,
  parseFlatOffer,
  navigateToNextPage
}) {
  return async function fetchOnce (getBrowser, page, onFlatOffer) {
    await navigateToFlatOfferListPage(page, flatOffersUrl)
    let hasNavigatedToNextPage
    do {
      const flatOfferElements = await page.getFlatOfferElements()
      for (const flatOfferElement of flatOfferElements) {
        const url = await flatOfferElement.getUrl()
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
