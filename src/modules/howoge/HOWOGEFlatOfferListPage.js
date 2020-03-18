import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { HOWOGEFlatOfferListElement } from './HOWOGEFlatOfferListElement.js'

export class HowogeFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements () {
    const flatOfferElementsSelector = '#immoobject-list .flat-single'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, HOWOGEFlatOfferListElement)
  }

  async getNumberOfResultsElement () {
    return await this.page.$('.immoobject-list--info-length')
  }
}
