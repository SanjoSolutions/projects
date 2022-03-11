import { authenticate } from './authenticate.js'

async function main() {
  const auth = await authenticate()
  const credentials = auth.credentials
  console.log('credentials', credentials)
}

main().catch(console.error)
