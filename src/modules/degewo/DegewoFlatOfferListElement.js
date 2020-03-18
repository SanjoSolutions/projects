import { FlatOfferListElement } from '../../lib/FlatOfferListElement.js'
import { getInnerTextOfChild } from '../../lib/getInnerTextOfChild.js'
import { getInnerTextOfChildAsCurrency } from '../../lib/getInnerTextOfChildAsCurrency.js'

export class DegewoFlatOfferListElement extends FlatOfferListElement {
  async getUrl () {
    const linkElement = await this.element.$('a')
    return await linkElement.evaluate(node => node.href)
  }

  async getColdRent () {
    return await getInnerTextOfChildAsCurrency(this.element, '.price')
  }

  async getSeniorsOnly () {
    const title = await getInnerTextOfChild(this.element, '.article__title')
    return title.includes('Senioren')
  }

  async getRequiredMinimumAge () {
    const title = await getInnerTextOfChild(this.element, '.article__title')
    const requiredMinimumAgeRegExp = /([1-9][0-9]*) oder älter/
    const result = requiredMinimumAgeRegExp.exec(title)
    return result ? parseInt(result[1], 10) : null
  }
}
