process.env.NODE_ENV = 'TESTING'

import path from 'path'
import puppeteer from 'puppeteer'
import { __dirname } from '../lib/__dirname.js'
import { resetFetchedFlatOffers } from '../fetchedFlatOffers.js'

run(main)

async function main () {
  const moduleNameUnderTest = process.argv[2]
  const modulePathUnderTest = path.resolve(__dirname(import.meta.url), moduleNameUnderTest, 'index.js')
  const { fetchOnce } = await import(modulePathUnderTest)

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
