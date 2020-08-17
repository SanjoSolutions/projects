import { writeFile } from '../file/writeFile.js'
import { readFile } from '../packages/read-file/built/readFile.js'
import { extractFunctions } from './extractFunctions.js'

async function main () {
  const filename = process.argv[2]
  const functionNames = process.argv.slice(3)

  const code = await readFile(filename)
  const result = extractFunctions({
    filename: filename,
    code,
  }, functionNames)
  await Promise.all(result.map(
    async ({ filename, code }) => {
      await writeFile(filename, code)
    },
  ))
}

main().catch(console.error)
