import { readFile } from '@sanjo/read-file'
import { writeFile } from '@sanjo/write-file'
import fs from 'fs/promises'
import path from 'path'

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

export const tocFileNameGenerators = [
  generateFallbackTOCFileName,
  generateMainlineTOCFileName,
  generateWrathTOCFileName,
  generateTBCTOCFileName,
  generateVanillaTOCFileName,
]

export function generateTOCFilePath(addOnPath, tocFileNameGenerator) {
  const addOnName = determineAddOnName(addOnPath)
  const tocFileName = tocFileNameGenerator(addOnName)
  return path.join(addOnPath, tocFileName)
}

export async function retrieveTOCFilePaths(addOnPath) {
  const tocFilePaths = tocFileNameGenerators.map(tocFileNameGenerator => generateTOCFilePath(
    addOnPath,
    tocFileNameGenerator,
  ))
  return await filterAsync(tocFilePaths, doesFileExists)
}

export async function filterAsync(array, predicate) {
  const result = []
  for (const entry of array) {
    if (await predicate(entry)) {
      result.push(entry)
    }
  }
  return result
}

function generateFallbackTOCFileName(addOnName) {
  return `${ addOnName }.toc`
}

function generateMainlineTOCFileName(addOnName) {
  return `${ addOnName }_Mainline.toc`
}

function generateWrathTOCFileName(addOnName) {
  return `${ addOnName }_Wrath.toc`
}

function generateTBCTOCFileName(addOnName) {
  return `${ addOnName }_TBC.toc`
}

function generateVanillaTOCFileName(addOnName) {
  return `${ addOnName }_Vanilla.toc`
}

export function determineAddOnName(addOnPath) {
  return path.basename(addOnPath)
}

export async function doesFileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch (error) {
    return false
  }
}
