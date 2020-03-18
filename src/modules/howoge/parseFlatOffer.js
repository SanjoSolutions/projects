import { createParseFlatOffer } from '../../lib/createParseFlatOffer.js'
import { applyForFlatOffer } from './applyForFlatOffer.js'
import { HowogeFlatOfferDetailPage } from './HowogeFlatOfferDetailPage.js'

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: HowogeFlatOfferDetailPage,
  applyForFlatOffer
})
