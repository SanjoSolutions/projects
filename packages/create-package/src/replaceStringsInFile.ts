import readFile from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'
import { replaceString } from './replaceString.js'

export async function replaceStringsInFile(filePath: string, replacements: Map<string, string>): Promise<void> {
  let content = await readFile(filePath)
  for (const [stringToReplace, stringToReplaceWith] of replacements.entries()) {
    content = replaceString(content, stringToReplace, stringToReplaceWith)
  }
  await writeFile(filePath, content)
}
