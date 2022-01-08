'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getUrl = getUrl

var _getWebServerPort = require('./getWebServerPort.js')

async function getUrl(input) {
  const webServerPort = await (0, _getWebServerPort.getWebServerPort)()
  const baseURL = `http://0.0.0.0:${webServerPort}`
  return new URL(input, baseURL).toString()
}
//# sourceMappingURL=getUrl.js.map
