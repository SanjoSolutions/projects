const puppeteer = require('puppeteer')
const { verifyContactData, process, getFlatOfferFetchers } = require('./core.js')

const intervalBetweenProcessRuns = 1000
const { contactData } = require('./config.js')

run(main)

async function main () {
  verifyContactData(contactData)
  const flatOfferFetchers = await getFlatOfferFetchers()
  const browser = await createBrowser()

  // In UTC
  const runFromHour = 7
  const runToHour = 20

  function shouldRun () {
    const now = new Date()
    const currentUTCHour = now.getUTCHours()
    return (runFromHour <= currentUTCHour && currentUTCHour <= runToHour)
  }

  function shouldStop () {
    return !shouldRun()
  }

  function runProcess() {
    console.log('Starting.')
    process(browser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData, shouldStop })
    onProcessStop(scheduleNextProcessStart)
  }

  function onProcessStop(callback) {
    timerForHour(runToHour, () => {
      console.log('Stopping.')
      callback()
    })
  }

  function scheduleNextProcessStart() {
    console.log('Scheduling next process start.')
    timerForHour(runFromHour, runProcess)
  }

  function timerForHour(hour, callback) {
    let hoursUntilTimeout
    const now = new Date()
    const currentUTCHour = now.getUTCHours()
    if (currentUTCHour < hour) {
      hoursUntilTimeout = hour - currentUTCHour
    } else {
      hoursUntilTimeout = 24 - currentUTCHour + hour
    }
    const oneHourInMilliseconds = 1 * 60 * 60 * 1000
    const nextProcessStartTime = Math.floor(Date.now() / oneHourInMilliseconds) * oneHourInMilliseconds
      + (hoursUntilTimeout * oneHourInMilliseconds)
    setTimeout(callback, nextProcessStartTime - Date.now())
  }

  if (shouldRun()) {
    runProcess()
  } else {
    scheduleNextProcessStart()
  }
}

function run (fn) {
  fn()
}

async function createBrowser () {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  })
}
