#!/usr/bin/env node

import { promises as fs, watch } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import vm from 'vm'
import { ArgumentParser } from 'argparse'

// compose after file has changed (basic version done (recompile all pages when something changes), no recursive watch support for linux (therefore does probably not work on linux)):
//   when page changed then compose page
//   when block changes then compose all pages that use block or use a block that uses the changed block (and so on) (indirect dependency)
//   when layout changes then compose all pages that use layout
// throw error when two blocks depend on each other.
// user functions have access to and run in compose context. (low priority)

const newLineExpression = '(?:\r\n|\n|\r)'

const rootPath = path.resolve(process.cwd())

let fileContentCache = new Map()

const pagesPath = 'pages'
const blocksPath = 'blocks'
const layoutsPath = 'layouts'

run(main)

async function main() {
  const argumentParser = new ArgumentParser({
    description: 'Compose'
  })

  argumentParser.add_argument('-w', '--watch', {help: 'Watch mode', action: 'store_true'})
  argumentParser.add_argument('-o', '--output', {help: 'Output path'})

  const args = argumentParser.parse_args()

  const outputPath = args.output || rootPath
  if (args.watch) {
    await composePages(outputPath)

    const onWatchEvent = async function (eventType, filePath) {
      fileContentCache.delete(filePath)
      await composePages(outputPath)
    }
    watchPath(path.join(rootPath, pagesPath), onWatchEvent)
    watchPath(path.join(rootPath, blocksPath), onWatchEvent)
    watchPath(path.join(rootPath, layoutsPath), onWatchEvent)
  } else {
    await composePages(outputPath)
  }
}

function watchPath(pathToWatch, onWatchEvent) {
  const watchOptions = {
    recursive: true,
  }
  watch(pathToWatch, watchOptions, (eventType, fileName) => {
    const filePath = path.join(pathToWatch, fileName)
    onWatchEvent(eventType, filePath)
  })
}

async function composePages(outputPath) {
  let userFunctions = {}
  try {
    userFunctions = await import(pathToFileURL(path.join(rootPath, 'compose.user.js')))
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND') {
      throw error
    }
  }

  console.log('Composing pages...')

  const rootDirectoryPath = path.join(rootPath, pagesPath)
  let directoryPaths = [rootDirectoryPath]
  let nextDirectoryPaths = []
  while (directoryPaths.length >= 1) {
    for (const directoryPath of directoryPaths) {
      let directoryEntries = await fs.readdir(directoryPath, {
        withFileTypes: true,
      })
      for (const directoryEntry of directoryEntries) {
        const entryFilename = directoryEntry.name
        const entryPath = path.join(directoryPath, entryFilename)
        const stats = directoryEntry.isSymbolicLink()
          ? await fs.stat(entryPath)
          : directoryEntry
        if (stats.isFile()) {
          const pagePath = path.relative(rootDirectoryPath, entryPath)
          console.log(`Composing page "${ pagePath }"...`)
          await composePage(outputPath, userFunctions, pagePath, entryPath)
        } else if (stats.isDirectory()) {
          nextDirectoryPaths.push(entryPath)
        }
      }
    }
    directoryPaths = nextDirectoryPaths
    nextDirectoryPaths = []
  }

  console.log('Done composing pages.')
}

async function composePage(outputPath, userFunctions, pagePath, pageSourcePath) {
  const pageDestinationPath = path.join(outputPath, pagePath)
  const content = await fs.readFile(pageSourcePath, { encoding: 'utf8' })
  const blockInsertPointRegExp = new RegExp(
    `<!-- BLOCK: (.+?) -->${newLineExpression}?`,
    'g',
  )
  let composedContent = content
  let result

  const layoutRegExp = new RegExp(
    `<!-- LAYOUT: (.+?) -->${newLineExpression}?`,
    'g',
  )
  let lastResult
  while ((result = layoutRegExp.exec(composedContent)) !== null) {
    composedContent =
      composedContent.substring(0, result.index) +
      composedContent.substring(result.index + result[0].length)
    lastResult = result
  }
  if (lastResult) {
    const layoutPath = lastResult[1]
    const layoutSourcePath = path.join(rootPath, layoutsPath, layoutPath)
    const layoutContent = await getFileContent(layoutSourcePath)
    const contentInsertPointRegExp = new RegExp(
      `<!-- CONTENT -->${newLineExpression}?`,
    )
    composedContent =
      composedContent.substring(0, lastResult.index) +
      layoutContent.replace(
        contentInsertPointRegExp,
        composedContent.substring(lastResult.index),
      )
  }

  while ((result = blockInsertPointRegExp.exec(composedContent)) !== null) {
    const blockFilename = result[1]
    const blockPath = path.join(rootPath, blocksPath, blockFilename)
    const blockContent = await getFileContent(blockPath)
    // This supports using insert points in blocks
    composedContent =
      composedContent.substring(0, result.index) +
      blockContent +
      composedContent.substring(result.index + result[0].length)
  }

  const compose = {
    getPagePath() {
      return pagePath
    },

    variables: new Map(),

    getVariable(name) {
      return compose.variables.get(name)
    },

    setVariable(name, value) {
      compose.variables.set(name, value)
    },
  }
  const boundUserFunction = Object.fromEntries(
    Object.entries(userFunctions).map(([functionName, fn]) => [
      functionName,
      fn.bind(null, compose),
    ]),
  )
  const context = { ...boundUserFunction }
  vm.createContext(context)
  const codeInsertPointRegExp = new RegExp(
    `<!-- CODE: (.+?) -->${newLineExpression}?`,
    'g',
  )
  while ((result = codeInsertPointRegExp.exec(composedContent)) !== null) {
    const code = result[1]
    let codeResult = ''
    try {
      codeResult = vm.runInContext(code, context)
      codeResult = typeof codeResult === 'undefined' ? '' : String(codeResult)
    } catch (error) {
      /*
       const lineNumber = Array.from(composedContent.substring(0, result.index)
       .matchAll(new RegExp(newLineExpression, 'g')))
       .length + 1
       console.error(`page: file://${pageSourcePath}, line number: ${lineNumber}`)
       */
      console.error(`Error: ${ error.message }`)
      console.error(`page: file://${ pageSourcePath }`)
      console.error(`markup: ${ result[0] }`)
      console.error(`code: ${ code }`)
      console.error(error.stack)
    }

    composedContent =
      composedContent.substring(0, result.index) +
      codeResult +
      composedContent.substring(result.index + result[0].length)
    codeInsertPointRegExp.lastIndex = result.index + codeResult.length
  }

  await fs.mkdir(path.dirname(pageDestinationPath), { recursive: true })
  await fs.writeFile(pageDestinationPath, composedContent, {
    encoding: 'utf8',
  })
}

async function getFileContent(filePath) {
  let fileContent
  if (fileContentCache.has(filePath)) {
    fileContent = fileContentCache.get(filePath)
  } else {
    fileContent = await fs.readFile(filePath, { encoding: 'utf8' })
    fileContentCache.set(filePath, fileContent)
  }
  return fileContent
}

function run(fn) {
  fn()
}
