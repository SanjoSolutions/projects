import request from '@sanjo/request'
export async function requestJSON(url, options = {}, data) {
  const body = data ? JSON.stringify(data) : undefined
  const response = await request(url, options, body)
  return JSON.parse(response.body)
}
//# sourceMappingURL=requestJSON.js.map
