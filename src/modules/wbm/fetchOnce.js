import { createFetchOnce } from '../../lib/createFetchOnce.js'
import { navigateToNextPage } from './navigateToNextPage.js'
import { parseFlatOffer } from './parseFlatOffer.js'
import { WBMFlatOfferListPage } from './WBMFlatOfferListPage.js'

export const fetchOnce = createFetchOnce({
  flatOffersUrl: 'https://www.wbm.de/wohnungen-berlin/angebote/',
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: WBMFlatOfferListPage
})
