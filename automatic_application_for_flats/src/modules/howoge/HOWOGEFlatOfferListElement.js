import { FlatOfferListElement } from '../../lib/FlatOfferListElement.js'

export class HOWOGEFlatOfferListElement extends FlatOfferListElement {
  async getUrl () {
    const linkElement = await this.element.$('a.flat-single--link')
    return await linkElement.evaluate(node => node.href)
  }
}
