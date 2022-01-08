process.env.NODE_ENV = 'TESTING'

import path from 'path'
import puppeteer from 'puppeteer'

run(main)

async function main() {
  const moduleNameUnderTest = process.argv[2]
  const modulePathUnderTest = path.resolve(__dirname, moduleNameUnderTest, 'index.js')
  const { fetchOnce } = await import(modulePathUnderTest)

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })

  function getBrowser() {
    return browser
  }

  const page = await browser.newPage()

  const url = process.argv[3]
  let flatOffer

  async function onFlatOffer(_flatOffer) {
    if (_flatOffer.url === url) {
      flatOffer = _flatOffer
      console.log('Flat offer: ', _flatOffer)
    }
  }

  function shouldStop() {
    return Boolean(flatOffer)
  }

  await fetchOnce(getBrowser, page, onFlatOffer, shouldStop)
}

function run(fn) {
  fn().then(console.log, console.error)
}
