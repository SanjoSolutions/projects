import { hasFetchedFlatOffer, registerFlatOfferAsFetched } from '../fetchedFlatOffers.js'
import { navigateToFlatOfferListPage } from './navigateToFlatOfferListPage.js'

export function createFetchOnce ({
  flatOffersUrl,
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage
}) {
  return async function fetchOnce (getBrowser, page, onFlatOffer, shouldStop = () => false) {
    const flatOfferListPage = new FlatOfferListPage(page)
    await navigateToFlatOfferListPage(page, flatOffersUrl)
    let hasNavigatedToNextPage
    let totalNumberOfFlatOfferElements = 0
    const numberOfResults = await flatOfferListPage.getNumberOfResults()
    do {
      const flatOfferElements = await flatOfferListPage.getFlatOfferElements()
      totalNumberOfFlatOfferElements += flatOfferElements.length
      for (const flatOfferElement of flatOfferElements) {
        if (shouldStop()) {
          return
        }
        const url = await flatOfferElement.getUrl()
        if (process.env.NODE_ENV === 'TESTING' || !await hasFetchedFlatOffer(url)) {
          const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
          onFlatOffer(flatOffer).then(async () => {
            if (process.env.NODE_ENV !== 'TESTING') {
              await registerFlatOfferAsFetched(url)
            }
          })
        }
      }
      hasNavigatedToNextPage = await navigateToNextPage(page)
    } while (hasNavigatedToNextPage)
    if (totalNumberOfFlatOfferElements !== numberOfResults) {
      console.error(
        new Error(
          `Has fetched ${totalNumberOfFlatOfferElements} elements, ` +
          `but number as results was states as ${numberOfResults} ` +
          `(on ${flatOffersUrl}).`
        )
      )
    }
  }
}
