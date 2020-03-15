import { createFetch } from '../../lib/createFetch.js'
import { DegewoFlatOfferListPage } from './DegewoFlatOfferListPage.js'
import { fetchOnce } from './fetchOnce.js'

export const fetch = createFetch({
  fetchOnce,
  FlatOfferListPage: DegewoFlatOfferListPage
})
