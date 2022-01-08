export async function waitForNavigation(page) {
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  })
}
