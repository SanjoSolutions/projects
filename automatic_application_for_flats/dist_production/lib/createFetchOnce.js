'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createFetchOnce = createFetchOnce

var _fetchedFlatOffers = require('../fetchedFlatOffers.js')

var _navigateToFlatOfferListPage = require('./navigateToFlatOfferListPage.js')

function createFetchOnce({ flatOffersUrl, parseFlatOffer, navigateToNextPage, FlatOfferListPage }) {
  return async function fetchOnce(getBrowser, page, onFlatOffer, shouldStop = () => false) {
    const flatOfferListPage = new FlatOfferListPage(page)
    await (0, _navigateToFlatOfferListPage.navigateToFlatOfferListPage)(page, flatOffersUrl)
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

        if (process.env.NODE_ENV === 'TESTING' || !(await (0, _fetchedFlatOffers.hasFetchedFlatOffer)(url))) {
          const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
          onFlatOffer(flatOffer).then(async () => {
            if (process.env.NODE_ENV !== 'TESTING') {
              await (0, _fetchedFlatOffers.registerFlatOfferAsFetched)(url, flatOffer)
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
            `but number as results was stated as ${numberOfResults} ` +
            `(on ${flatOffersUrl}).`
        )
      )
    }
  }
}
//# sourceMappingURL=createFetchOnce.js.map
