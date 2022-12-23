import { readFile } from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'

export async function addIncludeFileAtTheTop(includeFile, tocFilePath) {
  const content = await readFile(tocFilePath)
  const includes = retrieveIncludes(content)
  const newIncludes = mergeIncludes([includeFile, ...includes])
  const newContent = replaceIncludes(content, newIncludes)
  await writeFile(tocFilePath, newContent)
}

export function mergeIncludes(includes) {
  return removeDuplicates(includes)
}

export function removeDuplicates(array) {
  const alreadyIncluded = new Set()
  return array.filter(element => {
    const include = !alreadyIncluded.has(element)
    alreadyIncluded.add(element)
    return include
  })
}

export function replaceIncludes(content, newIncludes) {
  let lines = createLines(content)
  lines = lines.filter(line => !isLoadFileLine(line))
  if (last(lines).trim() !== '') {
    lines.push('')
  }
  lines = lines.concat(newIncludes)

  const newContent = lines.join('\n')
  return newContent
}

export function retrieveIncludes(content) {
  return extractListedFiles(content)
}

export function extractListedFiles(tocFileContent) {
  const lines = createLines(tocFileContent)
  const loadFileLines = lines.filter(isLoadFileLine)
  const loadedFiles = loadFileLines.map(line => line.trim())
  return loadedFiles
}

export function createLines(content) {
  const lines = content.split(/(?:\n|\r\n|\r)/)
  return lines
}

export function isLoadFileLine(line) {
  const trimmedLine = line.trim()
  return trimmedLine.length >= 1 && !isCommentLine(trimmedLine)
}

const COMMENT_LINE_REGEXP = /^##/

export function isCommentLine(line) {
  return COMMENT_LINE_REGEXP.test(line)
}

export function last(array) {
  return array[array.length - 1]
}

