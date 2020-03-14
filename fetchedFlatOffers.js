module.exports = {
  hasFetchedFlatOffer,
  registerFlatOfferAsFetched
}

const util = require('util')
const _fs = require('fs')
const fs = {
  writeFile: util.promisify(_fs.writeFile)
}
const path = require('path')

const fetchedFlatOffersFileName = 'fetchedFlatOffers.json'

function hasFetchedFlatOffer(url) {
  const fetchedFlatOffers = require(`./${fetchedFlatOffersFileName}`)
  return Boolean(fetchedFlatOffers[url])
}

async function registerFlatOfferAsFetched (url) {
  const fetchedFlatOffers = require(`./${fetchedFlatOffersFileName}`)
  fetchedFlatOffers[url] = true
  await fs.writeFile(
    path.join(__dirname, fetchedFlatOffersFileName),
    JSON.stringify(fetchedFlatOffers, null, 2)
  )
}
