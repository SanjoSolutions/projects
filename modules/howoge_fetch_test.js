const puppeteer = require('puppeteer')
const { fetchOnce } = require('./howoge.js')

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

  function onFlatOffer (flatOffer) {
    console.log('Flat offer: ', flatOffer)
  }

  await fetchOnce(browser, page, onFlatOffer)
}

function run (fn) {
  fn().then(console.log, console.error)
}
