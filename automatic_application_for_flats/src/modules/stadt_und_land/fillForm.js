import { partial } from '../../lib/partial.js'
import { type as typeIntoInput } from '../../lib/type.js'

export async function fillForm({ form, page }, contactData) {
  const type = partial(typeIntoInput, form)

  const title = contactData.title === 'Mrs.' ? 'mrs' : 'mr'
  await (await form.$('select[name="title[]"]')).select(title)

  await type('input[name="name[]"]', contactData.lastName)
  await type('input[name="firstname[]"]', contactData.firstName)

  if (contactData.address.street) {
    let streetAndNumber = contactData.address.street
    if (contactData.address.number) {
      streetAndNumber += ' ' + contactData.address.number
    }
    await type('input[name="street[]"]', streetAndNumber)
  }

  if (contactData.address.postalCode) {
    await type('input[name="zip[]"]', contactData.address.postalCode)
  }

  if (contactData.address.city) {
    await type('input[name="city[]"]', contactData.address.city)
  }

  await type('input[name="phone[]"]', contactData.phone)
  await type('input[name="email[]"]', contactData.email)

  const wbsOptions = await form.$$('input[name="subsidized_housing[]"]')
  if (contactData.wbs) {
    await wbsOptions[0].evaluate(node => node.click())
  } else {
    await wbsOptions[1].evaluate(node => node.click())
  }

  await (await form.$('input[name="privacyProtectionAccepted[]"]')).click()
}
