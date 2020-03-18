import { formatDate } from '../../lib/formatDate.js'
import { partial } from '../../lib/partial.js'
import { type as typeIntoInput } from '../../lib/type.js'

export async function fillForm ({ form, page }, contactData) {
  // IMPROVEMENT: Generalize and extract out
  async function selectOption (selectSelector, optionsSelector, optionIndexToSelect, isMultiSelect = false) {
    const select = await form.$(selectSelector)
    await select.click()
    const options = await page.$(optionsSelector)
    await options.evaluate(
      (options, optionIndexToSelect) => {
        options.children[optionIndexToSelect].click()
      },
      optionIndexToSelect
    )
    if (isMultiSelect) {
      await select.click()
    }
  }

  // IMPROVEMENT: Generalize and extract out
  async function selectRadio (elementOrSelector, optionIndex) {
    const radioGroup = typeof elementOrSelector === 'string'
      ? await form.$(elementOrSelector)
      : elementOrSelector
    await radioGroup.evaluate(
      (node, optionIndex) => node.children[optionIndex].click(),
      optionIndex
    )
  }

  const type = partial(typeIntoInput, form)

  await selectOption(
    'nz-select[formcontrolname="salutation"]',
    '#cdk-overlay-0 > div > div > ul',
    contactData.title === 'Mrs.' ? 0 : 1
  )

  await type('#firstName', contactData.firstName)
  await type('#lastName', contactData.lastName)
  await type('#email', contactData.email)
  if (contactData.phone) {
    await type('#phone-number', contactData.phone)
  }
  const address = contactData.address
  await type('#street', address.street)
  await type('#house-number', address.number)
  await type('#zip-code', address.postalCode)
  await type('#city', address.city)
  await type('#applicant-message', contactData.applicationMessage)
  await type('[id*="grownUps"]', String(contactData.numberOfAdults))
  await type('[id*="kids"]', String(contactData.numberOfChildren))
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '[id*="employmentTypes"]',
    '#cdk-overlay-1 > div > div > ul',
    8,
    true
  )
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '[id*="income"]',
    '#cdk-overlay-2 > div > div > ul',
    1
  )
  await type('[id*="earliestMoveInDate"]', formatDate(contactData.earliestDateToMoveIn))
  const wbsElement = await form.$('[id*="_wbs_"]') // _wbs_special_housing_need_
  if (wbsElement) {
    if (contactData.wbs) {
      await selectRadio(wbsElement, 0)
      await type('[id*="wbs_valid_until"]', formatDate(contactData.wbs.validUntil))
      await selectOption(
        '[id*="eligibleNumberOfRooms"]',
        '#cdk-overlay-3 > div > div > ul',
        contactData.wbs.numberOfRooms - 1
      )
    } else {
      await wbsElement.evaluate(node => node.children[1].click())
    }
  }

  const wbsSpecialHousingNeedElement = await form.$('[id*="_wbs_special_housing_need_"]')
  if (wbsSpecialHousingNeedElement) {
    const labelElement = await form.$('[for*="_wbs_special_housing_need_"]')
    const labelText = await labelElement.evaluate(node => node.innerText)
    const isSpecialHousingNeedForElders = labelText.includes('Alte Menschen')
    const hasSpecialHousingNeed = isSpecialHousingNeedForElders
      ? contactData.wbs.specialHousingNeedForElders
      : contactData.wbs.specialHousingNeed
    const optionToSelect = contactData.wbs && hasSpecialHousingNeed ? 0 : 1
    await selectRadio(wbsSpecialHousingNeedElement, optionToSelect)
  }

  await selectRadio('[id*="pets"]', contactData.hasPets ? 0 : 1)
  await selectRadio('[id*="flatLoss"]', contactData.threatenedByLossOfHousing ? 0 : 1)
  await selectRadio('[id*="firstFlat"]', contactData.firstTimeHousehold ? 0 : 1)
  await selectRadio('[id*="m-schein-available"]', contactData.mBill ? 0 : 1)

  await (await form.$('[id*="dataPrivacy"]')).click()
}
