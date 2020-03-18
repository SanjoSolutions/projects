export async function acceptCookies (page) {
  const cookieSettingsSubmit = await page.$('.cookie-settings-submit')
  if (cookieSettingsSubmit) {
    await cookieSettingsSubmit.click()
  }
}
