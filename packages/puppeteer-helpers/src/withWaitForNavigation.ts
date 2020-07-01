import type { Page } from 'puppeteer'
import { waitForNavigation } from './waitForNavigation'

export async function withWaitForNavigation (
  page: Page,
  ...promises: Promise<any>[]
): Promise<void> {
  await Promise.all([
    waitForNavigation(page),
    ...promises,
  ])
}
