import type { OAuth2Client } from 'google-auth-library'
import { readCredentials } from './readCredentials.js'
import { saveCredentials } from './saveCredentials.js'

export async function updateTokenIfUpdated(auth: OAuth2Client): Promise<void> {
  const credentials = await readCredentials()
  const isAccessTokenDifferent = auth.credentials.access_token !== credentials.access_token
  const isExpiryDateDifferent = auth.credentials.expiry_date !== credentials.expiry_date
  if (isAccessTokenDifferent) {
    credentials.access_token = auth.credentials.access_token
  }
  if (isExpiryDateDifferent) {
    credentials.expiry_date = auth.credentials.expiry_date
  }
  if (isAccessTokenDifferent || isExpiryDateDifferent) {
    saveCredentials(credentials)
  }
}
