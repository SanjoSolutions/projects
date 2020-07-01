'use strict'

const functions = require('firebase-functions')
const paypal = require('paypal-rest-sdk')
const sendGridMail = require('@sendgrid/mail')
sendGridMail.setApiKey(functions.config().email.api_key)

// firebase-admin SDK init
const admin = require('firebase-admin')
admin.initializeApp()

// Configure your environment
paypal.configure({
  mode: functions.config().paypal.mode, // sandbox or live
  client_id: functions.config().paypal.client_id, // run: firebase functions:config:set paypal.client_id="yourPaypalClientID"
  client_secret: functions.config().paypal.client_secret // run: firebase functions:config:set paypal.client_secret="yourPaypalClientSecret"
})

/**
 * Expected in the body the amount
 * Set up the payment information object
 * Initialize the payment and redirect the user to the PayPal payment page
 */
exports.pay = functions
  .https
  .onRequest((req, res) => {
    // 1. Set up a payment information object, Build PayPal payment request
    const payReq = JSON.stringify({
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'https://din-5008-schreiben.web.app/process',
        cancel_url: 'https://din-5008-schreiben.web.app'
      },
      transactions: [{
        item_list: {
          items: [{
            name: 'DIN 5008 Schreiben für Google Docs',
            price: 5,
            currency: 'EUR',
            quantity: 1
          }]
        },
        amount: {
          total: 5,
          currency: 'EUR',
          details: {
            subtotal: 5
          }
        },
        // This is the payment transaction description. Maximum length: 127
        description: 'DIN 5008 Schreiben für Google Docs',
        // reference_id string .Optional. The merchant-provided ID for the purchase unit. Maximum length: 256.
        // reference_id: req.body.uid,
        // custom: req.body.uid,
        // soft_descriptor: req.body.uid
        // "invoice_number": req.body.uid,A
      }]
    })

    // 2.Initialize the payment and redirect the user.
    paypal.payment.create(payReq, (error, payment) => {
      const links = {}
      if (error) {
        console.error(error)
        res.status('500').end()
      } else {
        // Capture HATEOAS links
        payment.links.forEach((linkObj) => {
          links[linkObj.rel] = {
            href: linkObj.href,
            method: linkObj.method
          }
        })
        // If redirect url present, redirect user
        if (Object.prototype.hasOwnProperty.call(links, 'approval_url')) {
          // REDIRECT USER TO links['approval_url'].href
          console.info(links.approval_url.href)
          // res.json({"approval_url":links.approval_url.href});
          res.redirect(302, links.approval_url.href)
        } else {
          console.error('no redirect URI present')
          res.status('500').end()
        }
      }
    })
  })

// 3.Complete the payment. Use the payer and payment IDs provided in the query string following the redirect.
exports.process = functions
  .https
  .onRequest(async (req, res) => {
    const paymentId = req.query.paymentId
    const payerId = {
      payer_id: req.query.PayerID
    }
    const r = await paypal.payment.execute(paymentId, payerId, async (error, payment) => {
      if (error) {
        console.error(error)
        res.redirect('https://din-5008-schreiben.web.app/error')
      } else {
        console.log(JSON.stringify(payment, null, 2))
        if (payment.state === 'approved') {
          console.info('payment completed successfully.')

          res.redirect('https://din-5008-schreiben.web.app/download')

          const to = payment && payment.payer && payment.payer.payer_info && payment.payer.payer_info.email
          if (to) {
            await sendMail({to})
          }
        } else {
          console.warn('payment.state: not approved ?')
          // replace debug url
          res.redirect(`https://console.firebase.google.com/project/${process.env.GCLOUD_PROJECT}/functions/logs?search=&severity=DEBUG`)
        }
      }
    })
    console.info('promise: ', r)
  })

async function sendMail({to}) {
  const mailOptions = {
    from: functions.config().email.from,
    to: to,
    subject: 'DIN 5008 Schreiben für Google Docs',
    text:
      'Sehr geehrte Damen und Herren,\n' +
      '\n' +
      'Hier können sie das DIN 5008 Schreiben für Google Docs herunterladen: ' +
      'https://din-5008-schreiben.web.app/download' +
      '\n' +
      '\n' +
      'Mit freundlichen Grüßen\n' +
      'Jonas Aschenbrenner',
    html:
      'Sehr geehrte Damen und Herren,<br>' +
      '<br>' +
      'Hier können sie das DIN 5008 Schreiben für Google Docs herunterladen: ' +
      '<a href="https://din-5008-schreiben.web.app/download">' +
      'https://din-5008-schreiben.web.app/download' +
      '</a><br>' +
      '<br>' +
      'Mit freundlichen Grüßen<br>' +
      'Jonas Aschenbrenner'
  }

  await sendGridMail.send(mailOptions)
}
