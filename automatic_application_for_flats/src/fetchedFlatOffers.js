import { promises as fs } from 'fs'
import path from 'path'
import { readJSON } from './lib/readJSON.js'
import { determineDirname } from './lib/determineDirname.js'

const __dirname = determineDirname(import.meta.url)

const fetchedFlatOffersFileName = 'fetchedFlatOffers.json'
const defaultFetchedFlatOffersFileName = 'fetchedFlatOffers.default.json'

async function readFetchedFlatOffers() {
  return await readJSON(path.resolve(__dirname, '..', fetchedFlatOffersFileName))
}

async function readDefaultFetchedFlatOffers() {
  return await readJSON(path.resolve(__dirname, '..', defaultFetchedFlatOffersFileName))
}

async function writeFetchedFlatOffers(fetchedFlatOffers) {
  await fs.writeFile(
    path.resolve(__dirname, '..', fetchedFlatOffersFileName),
    JSON.stringify(fetchedFlatOffers, null, 2),
    { encoding: 'utf8' }
  )
}

export async function hasFetchedFlatOffer(url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  return Boolean(fetchedFlatOffers[url])
}

export async function registerFlatOfferAsFetched(url, flatOffer) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  fetchedFlatOffers[url] = true
  await writeFetchedFlatOffers(fetchedFlatOffers)
}

export async function resetFetchedFlatOffers() {
  const defaultFetchedFlatOffers = await readDefaultFetchedFlatOffers()
  await writeFetchedFlatOffers(defaultFetchedFlatOffers)
}
