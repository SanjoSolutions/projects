const puppeteer = require('puppeteer')
const { verifyContactData, process, getFlatOfferFetchers } = require('./core.js')

const intervalBetweenProcessRuns = 1000
const { contactData } = require('./config.js')

run(main)

async function main () {
  verifyContactData(contactData)
  const flatOfferFetchers = await getFlatOfferFetchers()
  const browser = await createBrowser()
  await process(browser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData })
}

function run (fn) {
  fn()
}

async function createBrowser () {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  })
}
