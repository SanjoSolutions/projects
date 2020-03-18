import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { StadtUndLandFlatOfferListElement } from './StadtUndLandFlatOfferListElement.js'

export class StadtUndLandFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '.SP-SearchResult .SP-TeaserList__item'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, StadtUndLandFlatOfferListElement)
  }

  async getNumberOfResults () {
    return parseInt(await this.getInnerText('.SP-SearchResult__amount strong:nth-child(3)'), 10)
  }
}
