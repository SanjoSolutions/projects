import { FlatOfferInformationRetriever } from './FlatOfferInformationRetriever.js'
import { getInnerTextOfChild } from './getInnerTextOfChild.js'
import { getInnerHTMLOfChild } from './getInnerHTMLOfChild.js'

export class FlatOfferInformationRetrieverPage extends FlatOfferInformationRetriever {
  constructor (page) {
    super()
    this.page = page
  }

  async getInnerText (selector) {
    return await getInnerTextOfChild(this.page, selector)
  }

  async getInnerHTML (selector) {
    return await getInnerHTMLOfChild(this.page, selector)
  }
}
