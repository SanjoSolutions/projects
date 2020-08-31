import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { GewobagFlatOfferListElement } from './GewobagFlatOfferListElement.js'

export class GewobagFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '.filtered-mietangebote article'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, GewobagFlatOfferListElement)
  }

  async getNumberOfResultsElement () {
    return await this.page.$('.filtered-count')
  }
}
