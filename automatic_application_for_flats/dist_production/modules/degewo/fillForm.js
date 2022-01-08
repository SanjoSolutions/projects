'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.fillForm = fillForm

var _selectOption = require('../../lib/wohnungshelden/selectOption.js')

var _type = require('../../lib/wohnungshelden/type.js')

async function fillForm({ form, page }, contactData) {
  await (0, _selectOption.selectOption)(
    {
      form,
      page,
    },
    'nz-select[formcontrolname="salutation"]',
    '#cdk-overlay-0 > div > div > ul',
    contactData.title === 'Mrs.' ? 0 : 1
  )
  await (0, _type.type)(
    {
      form,
      page,
    },
    '#firstName',
    contactData.firstName
  )
  await (0, _type.type)(
    {
      form,
      page,
    },
    '#lastName',
    contactData.lastName
  )
  await (0, _type.type)(
    {
      form,
      page,
    },
    '#email',
    contactData.email
  )

  if (contactData.phone) {
    await (0, _type.type)(
      {
        form,
        page,
      },
      '#phone-number',
      contactData.phone
    )
  }

  await (0, _type.type)(
    {
      form,
      page,
    },
    '#applicant-message',
    contactData.applicationMessage
  )
  await (0, _type.type)(
    {
      form,
      page,
    },
    '#formly_2_input_numberPersonsTotal_0',
    String(contactData.numberOfAdults + contactData.numberOfChildren)
  )
}
//# sourceMappingURL=fillForm.js.map
