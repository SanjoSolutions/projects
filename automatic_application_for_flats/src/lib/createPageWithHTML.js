export async function createPageWithHTML(browser, html) {
  const page = await browser.newPage()
  await page.evaluate(
    /* disable coverage */ (html) => {
      document.body.innerHTML = html
    },
    html,
  )
  return page
}
