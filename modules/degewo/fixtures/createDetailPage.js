import { promises as fs } from 'fs'
import path from 'path'
import { __dirname } from '../../../lib/__dirname.js'
import { createPageWithHTML } from '../../../lib/createPageWithHTML.js'

let html

export async function createDetailPage (browser) {
  if (!html) {
    html = await fs.readFile(path.resolve(__dirname(import.meta.url), 'degewo_detail_page.html'))
  }
  return await createPageWithHTML(browser, html)
}
