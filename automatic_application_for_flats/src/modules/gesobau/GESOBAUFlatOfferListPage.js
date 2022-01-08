import { FlatOfferListPage } from '../../lib/FlatOfferListPage.js'
import { getFlatOfferElements } from '../../lib/getFlatOfferElements.js'
import { hasClass } from '../../lib/puppeteer/hasClass.js'
import { GESOBAUFlatOfferListElement } from './GESOBAUFlatOfferListElement.js'

export class GESOBAUFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements() {
    const flatOfferElementsSelector = '#c7303 .tab-pane:nth-child(1) .list_item'
    return await getFlatOfferElements(this.page, flatOfferElementsSelector, GESOBAUFlatOfferListElement)
  }

  async getNumberOfResultsElement() {
    return await this.page.$('#tx-openimmo-6329 > div.head > div > div:nth-child(1)')
  }

  async handleCookiesAndPrivacy() {
    const modal = await this.page.$('#cookieman-modal')
    if (await hasClass(modal, 'in')) {
      const selector = 'button[data-cookieman-save]'
      await this.page.waitFor(selector, { visible: true })
      const button = await this.page.$(selector)
      await button.click()
    }
  }
}
