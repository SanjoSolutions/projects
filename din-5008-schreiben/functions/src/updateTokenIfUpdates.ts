import type { OAuth2Client } from "google-auth-library"
import { readCredentials } from "./readCredentials.js"
import { saveCredentials } from "./saveCredentials.js"
import isEqual from "lodash.isequal"

export async function updateTokenIfUpdated(auth: OAuth2Client): Promise<void> {
  const credentials = await readCredentials()
  console.log("auth.credentials", JSON.stringify(auth.credentials))
  console.log("credentials", JSON.stringify(credentials))
  if (!isEqual(auth.credentials, credentials)) {
    await saveCredentials(auth.credentials)
  }
}
