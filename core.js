// Node.js 10

module.exports = {
  process,
  getFlatOfferFetchers
}

const util = require('util')
const path = require('path')
const _fs = require('fs')
const fs = {
  readdir: util.promisify(_fs.readdir),
  stat: util.promisify(_fs.stat),
  writeFile: util.promisify(_fs.writeFile),
}


const modulesDirectoryName = 'modules'

const modulesPath = path.join(__dirname, modulesDirectoryName)



async function process (browser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData }) {
  console.log('Fetching flat offers...')
  fetchFlatOffers(
    browser,
    intervalBetweenProcessRuns,
    flatOfferFetchers,
    onFlatOffer.bind(null, browser, contactData)
  )
}

async function onFlatOffer(browser, contactData, flatOffer) {
  if (!haveAppliedForFlatOffer(flatOffer) && kommtInFrage(flatOffer)) {
    await apply (browser, contactData, flatOffer)
  }
}

async function getFlatOfferFetchers () {
  const flatOfferFetchers = []
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
        flatOfferFetchers.push(fetcher)
      }
    }
  }
  return flatOfferFetchers
}

function fetchFlatOffers (browser, intervalBetweenProcessRuns, flatOfferFetchers, onFlatOffer) {
  for (const fetch of flatOfferFetchers) {
    fetch(browser, intervalBetweenProcessRuns, onFlatOffer, () => false)
  }
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

async function apply (browser, contactData, flatOffer) {
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
