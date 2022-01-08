export async function saveScreenshot(page, filePath) {
  await page.screenshot({
    path: filePath,
  })
}
