import { createParseFlatOffer } from '../../lib/createParseFlatOffer.js'
import { applyForFlatOffer } from './applyForFlatOffer.js'
import { DegewoFlatOfferDetailPage } from './DegewoFlatOfferDetailPage.js'

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: DegewoFlatOfferDetailPage,
  applyForFlatOffer
})
