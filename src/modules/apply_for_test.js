process.env.NODE_ENV = 'TESTING'

import path from 'path'
import puppeteer from 'puppeteer'
import { contactData } from '../config.js'

run(main)

async function main () {
  const moduleNameUnderTest = process.argv[2]
  const modulePathUnderTest = path.resolve(__dirname, moduleNameUnderTest, 'index.js')
  const { applyForFlatOffer } = await import(modulePathUnderTest)

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  })

  function getBrowser () {
    return browser
  }

  const url = process.argv[3]
  const flatOffer = { url }
  await applyForFlatOffer(getBrowser, flatOffer, contactData)
}

function run (fn) {
  fn().then(console.log, console.error)
}
