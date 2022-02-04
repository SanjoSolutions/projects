import escapeForRegExp from '@sanjo/escape-for-reg-exp'
import readFile from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'

export async function replaceStringInFile(
  filePath: string,
  stringToReplace: string,
  stringToReplaceWith: string
): Promise<void> {
  let content = await readFile(filePath)
  content = content.replace(new RegExp(escapeForRegExp(stringToReplace), 'g'), stringToReplaceWith)
  await writeFile(filePath, content)
}
