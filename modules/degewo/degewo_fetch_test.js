process.env.NODE_ENV = 'TESTING'

import puppeteer from 'puppeteer'
import { resetFetchedFlatOffers } from '../../fetchedFlatOffers.js'
import { fetchOnce } from './index.js'

run(main)

async function main () {
  await resetFetchedFlatOffers()

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  })

  function getBrowser() {
    return browser
  }

  const page = await browser.newPage()

  async function onFlatOffer (flatOffer) {
    console.log('Flat offer: ', flatOffer)
  }

  await fetchOnce(getBrowser, page, onFlatOffer)
}

function run (fn) {
  fn().then(console.log, console.error)
}
