const puppeteer = require('puppeteer')
const { fetch } = require('./degewo.js')
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
  const flatOffers = await fetch(browser)
  await flatOffers[0].apply(browser, contactData)
}

function run (fn) {
  fn().then(console.log, console.error)
}
