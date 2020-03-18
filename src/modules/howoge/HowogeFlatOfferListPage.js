import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { HowogeFlatOfferListElement } from './HowogeFlatOfferListElement.js'

export class HowogeFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '#immoobject-list .flat-single'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, HowogeFlatOfferListElement)
  }

  async getNumberOfResults () {
    return parseInt(await this.getInnerText('.immoobject-list--info-length'), 10)
  }
}
