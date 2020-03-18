import { acceptCookies } from './acceptCookies.js'

export async function navigateToForm (page) {
  await acceptCookies(page)

  const contactButton = await page.$('button.rental-contact')
  await contactButton.click()

  const contactIframeSelector = '#contact-iframe'
  await page.waitFor(contactIframeSelector, { visible: true })
  const contactIframe = await page.$(contactIframeSelector)
  await page.goto(await contactIframe.evaluate(node => node.src))

  return await page.$('form')
}
