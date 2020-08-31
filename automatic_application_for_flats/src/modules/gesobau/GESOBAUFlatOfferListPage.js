import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { GESOBAUFlatOfferListElement } from './GESOBAUFlatOfferListElement.js'

export class GESOBAUFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '#c5316 #list > div > div > div'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, GESOBAUFlatOfferListElement)
  }

  async getNumberOfResultsElement () {
    return await this.page.$('#tx-openimmo-5316 > div > div.head > div > div:nth-child(1)')
  }
}
