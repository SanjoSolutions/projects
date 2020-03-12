// Node.js 10
const util = require('util')
const path = require('path')
const _fs = require('fs')
const fs = {
  readdir: util.promisify(_fs.readdir),
  stat: util.promisify(_fs.stat),
  writeFile: util.promisify(_fs.writeFile),
}
const puppeteer = require('puppeteer')
const {contactData} = require('./config.js')

const intervalBetweenProcessRuns = 1000

const modulesDirectoryName = 'modules'

const modulesPath = path.join(__dirname, modulesDirectoryName)

run(main)

async function main () {
  const browser = await createBrowser({headless: true})
  await runProcess(browser)
}

async function runProcess(browser) {
  await process(browser)
  scheduleNextProcessRun(browser)
}

function scheduleNextProcessRun(browser) {
  setTimeout(() => runProcess(browser), intervalBetweenProcessRuns)
}

async function process (browser) {
  const flatOffersFetchers = await getFlatOffersFetchers()

  console.log('Fetching flat offers...')
  const flatOffers = await fetchFlatOffers(browser, flatOffersFetchers)
  console.log('Done fetching flat offers.')

  console.log('Number of flat offers: ', flatOffers.length)

  const flatsOffersToApplyTo = flatOffers
    .filter(flatOffer => !haveAppliedForFlatOffer(flatOffer))
    .filter(kommtInFrage)

  console.log('Number of flat offers to apply to: ', flatsOffersToApplyTo.length)

  await applyToFlatOffers(browser, flatsOffersToApplyTo)
}

function run (fn) {
  fn()
}

async function createBrowser(options) {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768
    },
    ...options
  })
}

async function getFlatOffersFetchers () {
  const flatOffersFetchers = []
  for (const fileName of await fs.readdir(modulesPath)) {
    const filePath = path.join(modulesPath, fileName)
    if (isJavaScriptFile(filePath) && !path.basename(fileName, path.extname(fileName)).endsWith('_test')) {
      const stats = await fs.stat(filePath)
      if (stats.isFile()) {
        const module = require(filePath)
        const fetcher = module.fetch
        if (!fetcher) {
          throw new Error(`Module "${filePath}" has no expected export "fetch".`)
        }
        if (typeof fetcher !== 'function') {
          throw new Error(`Module "${filePath}" export "fetch" has not the expected type "function".`)
        }
        flatOffersFetchers.push(fetcher)
      }
    }
  }
  return flatOffersFetchers
}

async function fetchFlatOffers (browser, flatOffersFetchers) {
  const flatOffers = []
  for (const fetch of flatOffersFetchers) {
    const fetchedFlatOffers = await fetch(browser)
    flatOffers.push(...fetchedFlatOffers)
  }
  return flatOffers
}

function kommtInFrage (flatOffer) {
  return (
    flatOffer.coldRent + flatOffer.coldServiceCharges <= 463.65 &&
    flatOffer.warmServiceCharges <= 76.50 &&
    for29YearOldPeople(flatOffer) &&
    flatOffer.area <= 50 && // m ** 2
    flatOffer.numberOfRooms <= 2
  )
}

function for29YearOldPeople (flatOffer) {
  const age = 29
  return (
    !isFlatOfferForSeniorsOnly(flatOffer) &&
    (!flatOffer.hasOwnProperty('requiredMinimumAge') || age >= flatOffer.requiredMinimumAge)
  )
}

function isFlatOfferForSeniorsOnly (flatOffer) {
  return flatOffer.seniorsOnly
}

async function applyToFlatOffers (browser, flatsOffersToApplyTo) {
  for (const flatOffer of flatsOffersToApplyTo) {
    await apply(browser, flatOffer, contactData)
  }
}

async function apply (browser, flatOffer, contactData) {
  console.log('Applying for flat offer: ', flatOffer)
  // console.log('Simulating…')
  await flatOffer.apply(browser, contactData)
  await registerFlatOfferAsAppliedTo(flatOffer)
  console.log('Applied for flat offer: ', flatOffer)
}

function haveAppliedForFlatOffer(flatOffer) {
  const flatOffersAppliedTo = require('./flatOffersAppliedTo.json')
  return flatOffersAppliedTo.includes(flatOffer.url)
}

async function registerFlatOfferAsAppliedTo(flatOffer) {
  const flatOffersAppliedTo = require('./flatOffersAppliedTo.json')
  flatOffersAppliedTo.push(flatOffer.url)
  await fs.writeFile(
    path.join(__dirname, 'flatOffersAppliedTo.json'),
    JSON.stringify(flatOffersAppliedTo, null, 2),
  )
}

function concat (...arrays) {
  return [].concat(...arrays)
}

function isJavaScriptFile (filePath) {
  return ['.js', '.mjs', '.cjs'].includes(path.extname(filePath))
}
