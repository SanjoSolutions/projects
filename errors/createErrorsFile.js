import { writeFile } from '../file/writeFile.js'

export async function createErrorsFile (filePath) {
  await writeFile(filePath, ['String', 'Line Number', 'File'].join(',') + '\n')
}
