import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { GewobagFlatOfferListElement } from './GewobagFlatOfferListElement.js'

export class GewobagFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '.filtered-mietangebote article'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, GewobagFlatOfferListElement)
  }

  async getNumberOfResults () {
    return parseInt(await this.getInnerText('.filtered-count'), 10)
  }
}
