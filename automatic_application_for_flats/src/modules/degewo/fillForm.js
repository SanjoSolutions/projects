import { clickRadioButtonBase } from "../../lib/clickRadioButtonBase.js"
import { partial } from "../../lib/partial.js"
import { type as typeIntoInput } from "../../lib/type.js"
import { selectOption } from "../../lib/wohnungshelden/selectOption.js"

export async function fillForm({ form, page }, contactData) {
  const type = partial(typeIntoInput, form)

  await selectOption(
    { form, page },
    'nz-select[formcontrolname="salutation"]',
    "#cdk-overlay-0 > div > div > ul",
    contactData.title === "Mrs." ? 0 : 1,
  )
  await type("#firstName", contactData.firstName)
  await type("#lastName", contactData.lastName)
  await type("#email", contactData.email)
  if (contactData.phone) {
    await type("#phone-number", contactData.phone)
  }
  if (contactData.note) {
    await type("#applicant-message", contactData.note)
  }
  await type(
    "#formly_2_input_numberPersonsTotal_0",
    String(contactData.numberOfAdults + contactData.numberOfChildren),
  )
}
