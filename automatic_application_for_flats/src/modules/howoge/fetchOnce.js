import { createFetchOnce } from '../../lib/createFetchOnce.js'
import { HowogeFlatOfferListPage } from './HowogeFlatOfferListPage.js'
import { navigateToNextPage } from './navigateToNextPage.js'
import { parseFlatOffer } from './parseFlatOffer.js'

export const fetchOnce = createFetchOnce({
  flatOffersUrl: 'https://www.howoge.de/wohnungen-gewerbe/wohnungssuche.html',
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: HowogeFlatOfferListPage
})
