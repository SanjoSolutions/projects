const puppeteer = require('puppeteer')
const { fetchOnce } = require('./gewobag.js')
const { contactData } = require('../config.js')

run(main)

async function main () {
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

  let flatOffer = null

  async function onFlatOffer (_flatOffer) {
    if (!flatOffer) {
      console.log('Flat offer: ', _flatOffer)
      await _flatOffer.apply(browser, contactData)
      flatOffer = _flatOffer
    }
  }

  await fetchOnce(getBrowser, page, onFlatOffer)

  /*
  if (flatOffer) {
    await flatOffer.apply(getBrowser, contactData)
  }
  */
}

function run (fn) {
  fn().then(console.log, console.error)
}
