import { withWaitForNavigation } from '@sanjo/puppeteer-helpers'
import type { Page } from 'puppeteer'

export class SlackLoginPage {
  #page: Page

  constructor(page: Page) {
    this.#page = page
  }

  async login(email: string, password: string): Promise<void> {
    await this.#page.type('#email', email)
    await this.#page.type('#password', password)
    await withWaitForNavigation(this.#page, this.#page.click('#signin_btn'))
  }
}
