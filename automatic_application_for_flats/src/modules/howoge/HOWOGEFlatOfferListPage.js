import { FlatOfferListPage } from "../../lib/FlatOfferListPage.js";
import { getFlatOfferElements } from "../../lib/getFlatOfferElements.js";
import { hasClass } from '../../lib/puppeteer/hasClass.js'
import { HOWOGEFlatOfferListElement } from "./HOWOGEFlatOfferListElement.js";

export class HowogeFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements() {
    const flatOfferElementsSelector = "#immoobject-list .flat-single";
    return await getFlatOfferElements(
      this.page,
      flatOfferElementsSelector,
      HOWOGEFlatOfferListElement
    );
  }

  async getNumberOfResultsElement() {
    return await this.page.$(".immoobject-list--info-length");
  }

  async handleCookiesAndPrivacy() {
    const cmpboxSelector = '.cmpbox'
    await this.page.waitForSelector(cmpboxSelector)

    const modal = await this.page.$(cmpboxSelector)

    if (!await hasClass(modal, 'cmpboxclosed')) {
      const settingsButton = await this.page.$('.cmpboxbtncustom')
      await settingsButton.click()

      await this.page.waitForSelector('.cmpboxCustomChoices')

      const acceptButton = await this.page.$('.cmpboxbtnyescustomchoices')
      await acceptButton.click()
    }
  }

  async waitForResultsToHaveBeenLoaded() {
    await this.page.waitForFunction(
      () => {
        const loading = document.querySelector('.results-wrapper .loading')
        return !loading.classList.contains('is')
      }
    )
  }
}
