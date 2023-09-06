import * as path from "path"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const keyFilePath = path.join(
  __dirname,
  "client_secret_657092275111-eptgp5fqb7pkjiu7nlf7i602ma60c56g.apps.googleusercontent.com.json",
)
