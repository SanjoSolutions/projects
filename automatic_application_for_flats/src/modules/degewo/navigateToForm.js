import { waitForNavigation } from '../../lib/puppeteer/waitForNavigation.js'

export async function navigateToForm(page) {
  const contactButton = await page.$('a[href="#kontakt"]')
  await contactButton.click()

  const formModalSelector = '.teaser-tileset__body--form'
  await page.waitForSelector(formModalSelector, { visible: true })

  const formModal = await page.$(formModalSelector)
  const iframe = await formModal.$('iframe')
  const src = await iframe.evaluate(iframe => iframe.getAttribute('src'))

  await page.goto(src, { waitUntil: 'networkidle0' })

  const formSelector = 'form'
  await page.waitForSelector(formSelector)

  const form = await page.$(formSelector)

  return form
}
