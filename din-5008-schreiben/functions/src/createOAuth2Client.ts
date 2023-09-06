import { last } from "@sanjo/array"
import { readJSON } from "@sanjo/read-json"
import { OAuth2Client } from "google-auth-library"
import { keyFilePath } from "./keyFilePath.js"
import { readCredentials } from "./readCredentials.js"

export async function createOAuth2Client(): Promise<OAuth2Client> {
  const keyFile = await readJSON(keyFilePath)
  const keys = keyFile.installed
  const redirectUri = last<string>(keys.redirect_uris)!
  const client = new OAuth2Client({
    clientId: keys.client_id,
    clientSecret: keys.client_secret,
    redirectUri,
  })
  client.credentials = await readCredentials()
  return client
}
