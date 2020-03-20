import { getTourSelector } from './getTourSelector.js'
import { getTourSteps } from './getTourSteps.js'

export async function submitForm ({ form, page }) {
  const tour = await page.$(getTourSelector())
  const steps = await getTourSteps(tour)
  await (await steps[3].$('.button.primary')).click()
  // TODO: Confirm successful submission
}
