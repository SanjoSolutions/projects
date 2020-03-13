// FIXME: Test broken (fetch signature changed)

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
  function getBrowser() {
    return browser
  }
  const flatOffers = await fetch(getBrowser)
  await flatOffers[0].apply(getBrowser, contactData)
}

function run (fn) {
  fn().then(console.log, console.error)
}
