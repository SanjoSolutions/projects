const puppeteer = require('puppeteer')
const { fetchOnce } = require('./stadt_und_land.js')
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

  const page = await browser.newPage()

  let flatOffer = null

  function onFlatOffer (_flatOffer) {
    if (!flatOffer) {
      console.log('Flat offer: ', _flatOffer)
      flatOffer = _flatOffer
    }
  }

  await fetchOnce(browser, page, onFlatOffer)

  if (flatOffer) {
    flatOffer.apply(browser, contactData)
  }
}

function run (fn) {
  fn().then(console.log, console.error)
}
