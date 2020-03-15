import { createParseFlatOffer } from '../../lib/createParseFlatOffer.js'
import { applyForFlatOffer } from './applyForFlatOffer.js'
import { DegewoFlatOfferDetailPage } from './DegewoFlatOfferDetailPage.js'
import { DegewoFlatOfferListElement } from './DegewoFlatOfferListElement.js'

export const parseFlatOffer = createParseFlatOffer({
  DegewoFlatOfferListElement,
  DegewoFlatOfferDetailPage,
  applyForFlatOffer
})
