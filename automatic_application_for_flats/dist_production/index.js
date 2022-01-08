'use strict'

var puppeteer__NAMESPACE__ = _interopRequireWildcard(require('puppeteer'))

var _config = require('./config.js')

var _core = require('./core.js')

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

const puppeteer = puppeteer__NAMESPACE__.default || puppeteer__NAMESPACE__
const intervalBetweenProcessRuns = 60000
run(main)

async function main() {
  ;(0, _core.verifyContactData)(_config.contactData)
  const flatOfferFetchers = await (0, _core.getFlatOfferFetchers)()
  let browserPromise

  function getBrowser() {
    if (!browserPromise) {
      browserPromise = createBrowser()
      browserPromise.then(browser => {
        browser.on('disconnect', () => {
          browserPromise = null
        })
      })
    }

    return browserPromise
  } // In UTC

  const runFromHour = 6
  const runToHour = 20

  function shouldRun() {
    const now = new Date()
    const currentUTCHour = now.getUTCHours()
    return runFromHour <= currentUTCHour && currentUTCHour <= runToHour
  }

  function shouldStop() {
    return !shouldRun()
  }

  async function runProcess() {
    console.log('Starting.')
    await (0, _core.process)(getBrowser, flatOfferFetchers, {
      intervalBetweenProcessRuns,
      contactData: _config.contactData,
      shouldStop,
    })
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
    const nextProcessStartTime =
      Math.floor(Date.now() / oneHourInMilliseconds) * oneHourInMilliseconds + hoursUntilTimeout * oneHourInMilliseconds
    setTimeout(callback, nextProcessStartTime - Date.now())
  }

  if (shouldRun()) {
    runProcess()
  } else {
    scheduleNextProcessStart()
  }
}

function run(fn) {
  fn()
}

async function createBrowser() {
  return await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })
}
//# sourceMappingURL=index.js.map
