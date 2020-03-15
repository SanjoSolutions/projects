import util from 'util'
import path from 'path'
import _fs from 'fs'
import { readJSON } from './lib/readJSON.js'
const fs = {
  readFile: util.promisify(_fs.readFile),
  writeFile: util.promisify(_fs.writeFile)
}

const fetchedFlatOffersFileName = 'fetchedFlatOffers.json'
const defaultFetchedFlatOffersFileName = 'fetchedFlatOffers.default.json'

async function readFetchedFlatOffers () {
  return await readJSON(`./${fetchedFlatOffersFileName}`)
}

async function readDefaultFetchedFlatOffers () {
  return await readJSON(`./${defaultFetchedFlatOffersFileName}`)
}

async function writeFetchedFlatOffers (fetchedFlatOffers) {
  await fs.writeFile(
    path.join(__dirname, fetchedFlatOffersFileName),
    JSON.stringify(fetchedFlatOffers, null, 2),
    { encoding: 'utf8' }
  )
}

export async function hasFetchedFlatOffer(url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  return Boolean(fetchedFlatOffers[url])
}

export async function registerFlatOfferAsFetched (url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  fetchedFlatOffers[url] = true
  await writeFetchedFlatOffers(fetchedFlatOffers)
}

export async function resetFetchedFlatOffers() {
  const defaultFetchedFlatOffers = await readDefaultFetchedFlatOffers()
  await writeFetchedFlatOffers(defaultFetchedFlatOffers)
}
