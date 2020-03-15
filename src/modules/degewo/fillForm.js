import { partial } from '../../lib/partial.js'
import { clickRadioButtonBase } from '../../lib/clickRadioButtonBase.js'
import { type as typeIntoInput } from '../../lib/type.js'

export async function fillForm (form, contactData) {
  const type = partial(typeIntoInput, form)
  const clickRadioButton = partial(clickRadioButtonBase, form)

  if (contactData.title) {
    if (contactData.title === 'Mr.') {
      await clickRadioButton(form, '#inquiry_herr')
    } else if (contactData.title === 'Mrs.') {
      await clickRadioButton(form, '#inquiry_frau')
    }
  }
  await type('#inquiry_prename', contactData.firstName)
  await type('#inquiry_surname', contactData.lastName)
  await type('#inquiry_email', contactData.email)
  if (contactData.phone) {
    await type('#inquiry_telephone', contactData.phone)
  }
  if (contactData.note) {
    await type('#inquiry_notes', contactData.note)
  }
}
