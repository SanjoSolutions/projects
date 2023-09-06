import { authenticate as authenticateBase } from "@google-cloud/local-auth"
import { keyFilePath } from "./keyFilePath.js"

export async function authenticate() {
  return await authenticateBase({
    keyfilePath: keyFilePath,
    scopes: [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.addons.current.message.action",
      "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
      "https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
  })
}
