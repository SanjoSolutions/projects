import { partial } from '../../lib/partial.js'
import { type as typeIntoInput } from '../../lib/type.js'

export async function fillForm ({ form, page }, contactData) {
  const type = partial(typeIntoInput, form)

  const wbsOptions = await form.$$('input[name*="[wbsvorhanden]"]')
  if (contactData.wbs) {
    await wbsOptions[0].evaluate(node => node.click())
    ;(await form.$('input[name*="[wbsmitbesonderemwohnbedarf][]"]')).evaluate(
      (checkbox, specialHousingNeed) => {
        checkbox.checked = specialHousingNeed
      },
      Boolean(contactData.wbs.specialHousingNeed)
    )
    ;(await form.$('input[name*="[wbsgueltigbis]"]')).evaluate(
      (input, date) => {
        input.value = date
      },
      formatDateForDateInput(contactData.wbs.validUntil)
    )
    ;(await form.$('select[name*="[wbszimmeranzahl]"]')).evaluate(
      (select, numberOfRooms) => {
        select.value = numberOfRooms
      },
      contactData.wbs.numberOfRooms
    )
  } else {
    await wbsOptions[1].evaluate(node => node.click())
  }

  await type('input[name*="[name]"]', contactData.lastName)
  await type('input[name*="[vorname]"]', contactData.firstName)

  if (contactData.address.street) {
    let streetAndNumber = contactData.address.street
    if (contactData.address.number) {
      streetAndNumber += ' ' + contactData.address.number
    }
    await type('input[name*="[strasse]"]', streetAndNumber)
  }

  if (contactData.address.postalCode) {
    await type('input[name*="[plz]"]', contactData.address.postalCode)
  }

  if (contactData.address.city) {
    await type('input[name*="[ort]"]', contactData.address.city)
  }

  await type('input[name*="[e_mail]"]', contactData.email)
  await type('input[name*="[telefon]"]', contactData.phone)

  ;(await form.$('input[name*="[datenschutzhinweis][]"]')).evaluate(
    (checkbox) => {
      checkbox.checked = true
    }
  )
}
