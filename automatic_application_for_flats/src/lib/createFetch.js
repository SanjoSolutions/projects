import { wait } from "./wait.js"

export function createFetch({ fetchOnce }) {
  return async function fetch(getBrowser, onFlatOffer) {
    const page = await (await getBrowser()).newPage()
    await fetchOnce(getBrowser, page, onFlatOffer)
    await page.close()
  }
}
