import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { GesobauFlatOfferListElement } from './GesobauFlatOfferListElement.js'

export class GesobauFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '#c5316 #list > div > div > div'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, GesobauFlatOfferListElement)
  }

  async getNumberOfResults () {
    return parseInt(await this.getInnerText('#tx-openimmo-5316 > div > div.head > div > div:nth-child(1)'), 10)
  }
}
