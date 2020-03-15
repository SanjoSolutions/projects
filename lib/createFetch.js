export function createFetch(fetchOnce) {
  return async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
    const page = await (await getBrowser()).newPage()

    while (!shouldStop()) {
      await fetchOnce(getBrowser, page, onFlatOffer)
      await wait(intervalBetweenProcessRuns)
    }

    await page.close()
  }
}
