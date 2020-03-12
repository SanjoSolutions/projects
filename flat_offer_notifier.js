module.exports = { notify }

const util = require('util')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
})

const sendMail = util.promisify(transporter.sendMail.bind(transporter))

async function notify (flatOffer, contactData) {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: contactData.email,
    subject: `New flat offer (${flatOffer.url})`,
    html: `<a href="${flatOffer.url}">${flatOffer.url}</a>`
  }

  await sendMail(mailOptions)
}
