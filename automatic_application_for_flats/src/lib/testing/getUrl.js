import { getWebServerPort } from "./getWebServerPort.js";

export async function getUrl(input) {
  const webServerPort = await getWebServerPort();
  const baseURL = `http://0.0.0.0:${webServerPort}`;
  return new URL(input, baseURL).toString();
}
