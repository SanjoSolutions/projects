import { createParseFlatOffer } from '../../lib/createParseFlatOffer.js'
import { applyForFlatOffer } from './applyForFlatOffer.js'
import { GewobagFlatOfferDetailPage } from './GewobagFlatOfferDetailPage.js'

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: GewobagFlatOfferDetailPage,
  applyForFlatOffer
})
