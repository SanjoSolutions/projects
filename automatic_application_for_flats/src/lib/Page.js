import { getInnerHTMLOfChild } from "./getInnerHTMLOfChild.js";
import { getInnerTextOfChild } from "./getInnerTextOfChild.js";

export class Page {
  constructor(page) {
    this.page = page;
  }

  async getInnerText(selector) {
    return await getInnerTextOfChild(this.page, selector);
  }

  async getInnerHTML(selector) {
    return await getInnerHTMLOfChild(this.page, selector);
  }
}
