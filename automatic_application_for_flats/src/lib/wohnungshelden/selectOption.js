export async function selectOption(
  { form, page },
  selectSelector,
  optionsSelector,
  optionIndexToSelect,
  isMultiSelect = false,
) {
  const select = await form.$(selectSelector)
  await select.click()
  const options = await page.$(optionsSelector)
  await options.evaluate((options, optionIndexToSelect) => {
    options.children[optionIndexToSelect].click()
  }, optionIndexToSelect)
  if (isMultiSelect) {
    await select.click()
  }
}
