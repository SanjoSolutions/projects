import { getWebServerPort } from "./getWebServerPort.js"

export async function getUrl(input) {
  const webServerPort = await getWebServerPort()
  const baseURL = `http://127.0.0.1:${webServerPort}`
  return new URL(input, baseURL).toString()
}
