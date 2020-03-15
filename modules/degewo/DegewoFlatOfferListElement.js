import { FlatOfferListElement } from '../../lib/FlatOfferListElement.js'
import { getInnerTextOfChildAsCurrency } from '../../lib/getInnerTextOfChildAsCurrency.js'
import { getInnerTextOfChild } from '../../lib/getInnerTextOfChild.js'

export class DegewoFlatOfferListElement extends FlatOfferListElement {
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
