#!/usr/bin/env node

import { noop } from "@sanjo/noop"
import { ArgumentParser } from "argparse"
import ejs from "ejs"
import { promises as fs, watch } from "fs"
import { marked } from "marked"
import { gfmHeadingId } from "marked-gfm-heading-id"
import path from "path"
import { pathToFileURL } from "url"
import vm from "vm"

marked.use(gfmHeadingId())

// compose after file has changed (basic version done (recompile all pages when something changes), no recursive watch support for linux (therefore does probably not work on linux)):
//   when page changed then compose page
//   when block changes then compose all pages that use block or use a block that uses the changed block (and so on) (indirect dependency)
//   when layout changes then compose all pages that use layout
// throw error when two blocks depend on each other.
// user functions have access to and run in compose context. (low priority)

const newLineExpression = "(?:\r\n|\n|\r)"

const rootPath = path.resolve(process.cwd())

let fileContentCache = new Map()

const pagesPath = "pages"
const blocksPath = "blocks"
const layoutsPath = "layouts"

run(main)

async function main() {
  const argumentParser = new ArgumentParser({
    description: "Compose",
  })

  argumentParser.add_argument("-w", "--watch", {
    help: "Watch mode",
    action: "store_true",
  })
  argumentParser.add_argument("-o", "--output", { help: "Output path" })

  const args = argumentParser.parse_args()

  const outputPath = args.output || rootPath
  if (args.watch) {
    await composePages(outputPath)

    const onWatchEvent = async function (eventType, filePath) {
      fileContentCache.delete(filePath)
      await composePages(outputPath)
    }
    watchFile(path.join(rootPath, "compose.user.js"), onWatchEvent)
    let isPagesPathBeingWatched = watchPath(
      path.join(rootPath, pagesPath),
      onWatchEvent,
    )
    let isBlocksPathBeingWatched = watchPath(
      path.join(rootPath, blocksPath),
      onWatchEvent,
    )
    let isLayoutsPathBeingWatched = watchPath(
      path.join(rootPath, layoutsPath),
      onWatchEvent,
    )
    watch(rootPath, {}, function (eventType, fileName) {
      if (!isPagesPathBeingWatched && fileName === pagesPath) {
        isPagesPathBeingWatched = watchPath(
          path.join(rootPath, pagesPath),
          onWatchEvent,
        )
      }
      if (!isBlocksPathBeingWatched && fileName === blocksPath) {
        isBlocksPathBeingWatched = watchPath(
          path.join(rootPath, blocksPath),
          onWatchEvent,
        )
      }
      if (!isLayoutsPathBeingWatched && fileName === layoutsPath) {
        isLayoutsPathBeingWatched = watchPath(
          path.join(rootPath, layoutsPath),
          onWatchEvent,
        )
      }
    })
  } else {
    await composePages(outputPath)
  }
}

function watchFile(pathToWatch, onWatchEvent) {
  const watchOptions = {}
  watch(pathToWatch, watchOptions, (eventType, fileName) => {
    onWatchEvent(eventType, pathToWatch)
  })
}

function watchPath(pathToWatch, onWatchEvent) {
  const watchOptions = {
    recursive: true,
  }
  try {
    watch(pathToWatch, watchOptions, (eventType, fileName) => {
      const filePath = path.join(pathToWatch, fileName)
      onWatchEvent(eventType, filePath)
    })
  } catch (error) {
    if (error.code === "ENOENT") {
      return false
    } else {
      throw error
    }
  }
  return true
}

async function composePages(outputPath) {
  let userFunctions = {}
  try {
    const composeUserPath = pathToFileURL(
      path.join(rootPath, "compose.user.js"),
    )
    composeUserPath.search = `?update=${Date.now()}`
    userFunctions = await import(composeUserPath)
  } catch (error) {
    if (error.code !== "ERR_MODULE_NOT_FOUND") {
      throw error
    }
  }

  console.log("Composing pages...")

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
          console.log(`Composing page "${pagePath}"...`)
          await composePage(outputPath, userFunctions, pagePath, entryPath)
        } else if (stats.isDirectory()) {
          nextDirectoryPaths.push(entryPath)
        }
      }
    }
    directoryPaths = nextDirectoryPaths
    nextDirectoryPaths = []
  }

  console.log("Done composing pages.")
}

const htmlExtensions = new Set([
  ".html",
  ".htm",
  ".dhtml",
  ".jhtml",
  ".mhtml",
  ".rhtml",
  ".shtml",
  ".zhtml",
  ".phtml",
])

const extensionsToReplaceWithHTML = new Set([
  ".jhtml",
  ".mhtml",
  ".rhtml",
  ".shtml",
  ".zhtml",
  ".phtml",
  ".ejs",
])

async function composePage(
  outputPath,
  userFunctions,
  pagePath,
  pageSourcePath,
) {
  const extension = path.extname(pagePath)
  const pageDestinationPath = path.join(
    outputPath,
    extensionsToReplaceWithHTML.has(extension)
      ? replaceExtensionWithHTML(pagePath)
      : pagePath,
  )
  const content = await fs.readFile(pageSourcePath, { encoding: "utf8" })

  let ejsOptions = {}

  function convertToMarkdown(strings, ...expressions) {
    return marked.parse(String.raw({ raw: strings }, ...expressions))
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

    setEJSOptions(options) {
      ejsOptions = options
    },

    md: convertToMarkdown,
    markdown: convertToMarkdown,
  }

  const userFunctionNamesWhichOverlapWithCompose = Object.keys(
    userFunctions,
  ).filter((functionName) => compose.hasOwnProperty(functionName))
  if (userFunctionNamesWhichOverlapWithCompose.length >= 1) {
    console.warn(
      `The following user functions overlap with compose functions: ${userFunctionNamesWhichOverlapWithCompose.join(
        ", ",
      )}`,
    )
  }

  const boundUserFunction = Object.fromEntries(
    Object.entries(userFunctions).map(([functionName, fn]) => [
      functionName,
      fn.bind(null, compose),
    ]),
  )

  const context = { ...compose, ...boundUserFunction }

  let composedContent = content

  vm.createContext(context)
  if (userFunctions.beforeRender) {
    await runInVmContext("beforeRender()", context)
  }

  const blockInsertPointRegExp = new RegExp(
    `<!-- BLOCK: (.+?) -->${newLineExpression}?`,
    "g",
  )
  let result

  const layoutRegExp = new RegExp(
    `<!-- LAYOUT: (.+?) -->${newLineExpression}?`,
    "g",
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
    if (layoutContent === null) {
      console.warn(
        `The file "${path.relative(
          process.cwd(),
          layoutSourcePath,
        )}" seems to be absent. Included via \`${lastResult[0].trim()}\` in "${path.relative(
          process.cwd(),
          pageSourcePath,
        )}".`,
      )
    }
    const contentInsertPointRegExp = new RegExp(
      `<!-- CONTENT -->${newLineExpression}?`,
    )
    const innerContent = composedContent.substring(lastResult.index)
    composedContent =
      composedContent.substring(0, lastResult.index) +
      (layoutContent === null
        ? innerContent
        : layoutContent.replace(contentInsertPointRegExp, innerContent))
  }

  while ((result = blockInsertPointRegExp.exec(composedContent)) !== null) {
    const blockFilename = result[1]
    const blockPath = path.join(rootPath, blocksPath, blockFilename)
    const blockContent = await getFileContent(blockPath)
    if (blockContent === null) {
      console.warn(
        `The file "${path.relative(
          process.cwd(),
          blockPath,
        )}" seems to be absent. Included via \`${result[0].trim()}\` in "${path.relative(
          process.cwd(),
          pageSourcePath,
        )}".`,
      )
    }
    // This supports using insert points in blocks
    composedContent =
      composedContent.substring(0, result.index) +
      (blockContent ?? "") +
      composedContent.substring(result.index + result[0].length)
  }

  const codeInsertPointRegExp = new RegExp(
    `<!-- CODE: (.+?) -->${newLineExpression}?`,
    "gs",
  )
  while ((result = codeInsertPointRegExp.exec(composedContent)) !== null) {
    const code = result[1]
    let codeResult = await runInVmContext(code, context, function () {
      console.error(`page: file://${pageSourcePath}`)
      console.error(`markup: ${result[0]}`)
    })
    codeResult = typeof codeResult === "undefined" ? "" : String(codeResult)

    composedContent =
      composedContent.substring(0, result.index) +
      codeResult +
      composedContent.substring(result.index + result[0].length)
    codeInsertPointRegExp.lastIndex = result.index + codeResult.length
  }

  if (extension === ".ejs") {
    composedContent = ejs.render(composedContent, context, ejsOptions)
  }

  await fs.mkdir(path.dirname(pageDestinationPath), { recursive: true })
  await fs.writeFile(pageDestinationPath, composedContent, {
    encoding: "utf8",
  })
}

function replaceExtensionWithHTML(filePath) {
  const dirname = path.dirname(filePath)
  const extension = path.extname(filePath)
  const basename = path.basename(filePath, extension)
  return path.join(dirname, basename + ".html")
}

async function runInVmContext(code, context, onError = noop) {
  try {
    return await vm.runInContext(code, context)
  } catch (error) {
    /*
     const lineNumber = Array.from(composedContent.substring(0, result.index)
     .matchAll(new RegExp(newLineExpression, 'g')))
     .length + 1
     console.error(`page: file://${pageSourcePath}, line number: ${lineNumber}`)
     */
    console.error(`Error: ${error.message}`)
    onError(error)
    console.error(`code: ${code}`)
    console.error(error.stack)
    return undefined
  }
}

async function getFileContent(filePath) {
  let fileContent
  if (fileContentCache.has(filePath)) {
    fileContent = fileContentCache.get(filePath)
  } else {
    try {
      fileContent = await fs.readFile(filePath, { encoding: "utf8" })
      fileContentCache.set(filePath, fileContent)
    } catch (error) {
      if (error.code === "ENOENT") {
        return null
      } else {
        throw error
      }
    }
  }
  return fileContent
}

function run(fn) {
  fn()
}
