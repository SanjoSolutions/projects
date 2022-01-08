import { withWaitForNavigation } from '@sanjo/puppeteer-helpers'
export class SlackLoginPage {
  #page
  constructor(page) {
    this.#page = page
  }
  async login(email, password) {
    await this.#page.type('#email', email)
    await this.#page.type('#password', password)
    await withWaitForNavigation(this.#page, this.#page.click('#signin_btn'))
  }
}
//# sourceMappingURL=SlackLoginPage.js.map
