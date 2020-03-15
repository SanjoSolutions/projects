import util from 'util'
import path from 'path'
import _fs from 'fs'
const fs = {
  readFile: util.promisify(_fs.readFile)
}
import { createPageWithHTML } from '../../../lib/createPageWithHTML.js'

let html
export async function createDetailPage(browser) {
  if (!html) {
    html = await fs.readFile(path.resolve(__dirname, 'degewo_detail_page.html'))
  }
  return await createPageWithHTML(browser, html)
}
