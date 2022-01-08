export async function waitForNavigation(page) {
  return await page.waitForNavigation({ waitUntil: 'networkidle0' })
}
//# sourceMappingURL=waitForNavigation.js.map
