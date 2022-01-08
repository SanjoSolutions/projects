'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.notify = notify

var util__NAMESPACE__ = _interopRequireWildcard(require('util'))

var nodemailer__NAMESPACE__ = _interopRequireWildcard(require('nodemailer'))

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function () {
    return cache
  }
  return cache
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

const util = util__NAMESPACE__.default || util__NAMESPACE__
const nodemailer = nodemailer__NAMESPACE__.default || nodemailer__NAMESPACE__
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
})
const sendMail = util.promisify(transporter.sendMail.bind(transporter))

async function notify(flatOffer, contactData) {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: contactData.email,
    subject: `New flat offer (${flatOffer.url})`,
    html: `<a href="${flatOffer.url}">${flatOffer.url}</a>`,
  }
  await sendMail(mailOptions)
}
//# sourceMappingURL=flat_offer_notifier.js.map
