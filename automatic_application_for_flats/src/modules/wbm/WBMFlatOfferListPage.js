import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { WBMFlatOfferListElement } from './WBMFlatOfferListElement.js'

export class WBMFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '.search .openimmo-search-list-item'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, WBMFlatOfferListElement)
  }
  
  async getNumberOfResultsElement () {
    // TODO: getNumberOfResultsElement ()
    return null
  }
}
