export function createFetch({
  fetchOnce,
  FlatOfferListPage
}) {
  return async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
    const page = new FlatOfferListPage(await (await getBrowser()).newPage())

    while (!shouldStop()) {
      await fetchOnce(getBrowser, page, onFlatOffer)
      await wait(intervalBetweenProcessRuns)
    }

    await page.close()
  }
}
