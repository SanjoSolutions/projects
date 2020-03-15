import puppeteer from 'puppeteer'

export async function createBrowser (optionsOverwrites) {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768
    },
    ...optionsOverwrites
  })
}
