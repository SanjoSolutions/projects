import { promises as fs } from "fs"
import path from "path"
import { createPageWithHTML } from "../../../lib/createPageWithHTML.js"
import { determineDirname } from "../../../lib/determineDirname.js"

const __dirname = determineDirname(import.meta.url)

let html

export async function createDetailPage(browser) {
  if (!html) {
    html = await fs.readFile(path.resolve(__dirname, "degewo_detail_page.html"))
  }
  return await createPageWithHTML(browser, html)
}
