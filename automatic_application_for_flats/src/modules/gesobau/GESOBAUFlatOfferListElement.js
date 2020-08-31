import { FlatOfferListElement } from '../../lib/FlatOfferListElement.js'
import { isTitleOfSeniorsOnlyFlat } from '../../lib/isTitleOfSeniorsOnlyFlat.js'

export class GESOBAUFlatOfferListElement extends FlatOfferListElement {
  async getUrl () {
    const linkElement = await this.element.$('.list_item-title a')
    return await linkElement.evaluate(node => node.href)
  }

  async getTitle () {
    const titleElement = await this.element.$('.list_item-title')
    return await titleElement.evaluate(node => node.innerText)
  }

  async getSeniorsOnly () {
    return isTitleOfSeniorsOnlyFlat(await this.getTitle())
  }
}
