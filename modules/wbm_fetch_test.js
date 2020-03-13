const puppeteer = require('puppeteer')
const { fetchOnce } = require('./_wbm.js')

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

  function onFlatOffer (flatOffer) {
    console.log('Flat offer: ', flatOffer)
  }

  await fetchOnce(getBrowser, page, onFlatOffer)
}

function run (fn) {
  fn().then(console.log, console.error)
}
