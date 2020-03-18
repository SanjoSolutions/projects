import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { DegewoFlatOfferListElement } from './DegewoFlatOfferListElement.js'

export class DegewoFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '.search__results article'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, DegewoFlatOfferListElement)
  }
}
