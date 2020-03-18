import { Page } from './Page.js'

export class FlatOfferListPage extends Page {
  async getFlatOfferElements () {
    return [] // instances of FlatOfferListElement
  }

  async getNumberOfResults () {
    return null
  }
}
