import type { Page, Response } from "puppeteer"

export async function waitForNavigation(page: Page): Promise<Response> {
  return await page.waitForNavigation({ waitUntil: "networkidle0" })
}
