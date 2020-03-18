import { FlatOfferListElement } from '../../lib/FlatOfferListElement.js'

export class GewobagFlatOfferListElement extends FlatOfferListElement {
  async getUrl () {
    const linkElement = await this.element.$('a.angebot-header')
    return await linkElement.evaluate(node => node.href)
  }
}
