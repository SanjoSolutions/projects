import { hasClass } from './puppeteer/hasClass.js'

export async function isElementDisabled(element) {
  return await hasClass(element, 'disabled')
}
