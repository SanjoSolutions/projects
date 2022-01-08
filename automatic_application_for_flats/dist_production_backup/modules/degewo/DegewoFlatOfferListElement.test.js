'use strict'

var _createBrowser = require('../../lib/createBrowser.js')

var _getUrl = require('../../lib/testing/getUrl.js')

var _DegewoFlatOfferListElement = require('./DegewoFlatOfferListElement.js')

var _createFlatOfferElement = require('./fixtures/createFlatOfferElement.js')

var _createSeniorsOnlyFlatOfferElement = require('./fixtures/createSeniorsOnlyFlatOfferElement.js')

let browser
beforeAll(async () => {
  browser = await (0, _createBrowser.createBrowser)()
})
afterAll(async () => {
  await browser.close()
})
describe('DegewoFlatOfferListElement', () => {
  describe('getUrl', () => {
    it('returns the url of the flat offer detail page', async () => {
      const page = await browser.newPage()
      await page.goto(await (0, _getUrl.getUrl)('/modules/degewo/fixtures/degewo_flat_offer_element.html'))
      const flatOfferElement = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(await page.$('article'))
      const url = await flatOfferElement.getUrl()
      expect(url).toEqual('http://0.0.0.0:8888/de/properties/1400-40137-0270')
    })
  })
  describe('getColdRent', () => {
    it('returns the cold rent as float', async () => {
      const element = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(
        await (0, _createFlatOfferElement.createFlatOfferElement)(browser)
      )
      const coldRent = await element.getColdRent()
      expect(coldRent).toEqual(178.06)
    })
  })
  describe('getSeniorsOnly', () => {
    it('returns true when for seniors only', async () => {
      const element = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(
        await (0, _createSeniorsOnlyFlatOfferElement.createSeniorsOnlyFlatOfferElement)(browser)
      )
      const seniorsOnly = await element.getSeniorsOnly()
      expect(seniorsOnly).toEqual(true)
    })
    it('returns false when not for seniors only', async () => {
      const element = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(
        await (0, _createFlatOfferElement.createFlatOfferElement)(browser)
      )
      const seniorsOnly = await element.getSeniorsOnly()
      expect(seniorsOnly).toEqual(false)
    })
  })
  describe('getRequiredMinimumAge', () => {
    it('returns the required minimum age when in the title', async () => {
      const element = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(
        await (0, _createSeniorsOnlyFlatOfferElement.createSeniorsOnlyFlatOfferElement)(browser)
      )
      const requiredMinimumAge = await element.getRequiredMinimumAge()
      expect(requiredMinimumAge).toEqual(60)
    })
    it('returns null when minimum age not in the title', async () => {
      const element = new _DegewoFlatOfferListElement.DegewoFlatOfferListElement(
        await (0, _createFlatOfferElement.createFlatOfferElement)(browser)
      )
      const requiredMinimumAge = await element.getRequiredMinimumAge()
      expect(requiredMinimumAge).toBeNull()
    })
  })
})
//# sourceMappingURL=DegewoFlatOfferListElement.test.js.map
