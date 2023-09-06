import { gmail, gmail_v1 } from "@googleapis/gmail"
import type { OAuth2Client } from "google-auth-library"
import { createOAuth2Client } from "./createOAuth2Client.js"

export async function createGmail(): Promise<{
  auth: OAuth2Client
  gmail: gmail_v1.Gmail
}> {
  const auth = await createOAuth2Client()
  const gmailInstance = gmail({
    version: "v1",
    auth,
  })
  return {
    auth,
    gmail: gmailInstance,
  }
}
