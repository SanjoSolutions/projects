import type { Page } from "puppeteer"

export class SlackChannelPage {
  #page: Page

  constructor(page: Page) {
    this.#page = page
  }

  async postMessage(message: string): Promise<void> {}
}
