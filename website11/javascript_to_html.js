import { promises as fs, watch } from "fs"
import path from "path"

const rootPath = path.resolve(process.cwd())

const pagesDirectoryName = "pages"
const blocksDirectoryName = "blocks"
const layoutsDirectoryName = "layouts"

const pagesPath = path.join(rootPath, pagesDirectoryName)
const blocksPath = path.join(rootPath, blocksDirectoryName)
const layoutsPath = path.join(rootPath, layoutsDirectoryName)

run(main)

async function main() {
  const args = process.argv.slice(2)
  if (args[0] === "watch") {
    await renderPages()

    const onWatchEvent = async function (eventType, filePath) {
      await renderPages()
    }
    watchPath(pagesPath, async function (eventType, filePath) {
      const pagePath = path.relative(pagesPath, filePath)
      await renderPageOrDeleteOutput(pagePath)
    })
    watchPath(blocksPath, onWatchEvent)
    watchPath(layoutsPath, onWatchEvent)
  } else {
    await renderPages()
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

async function renderPages() {
  console.log("Rendering pages…")

  let directoryPaths = [pagesPath]
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
        if (stats.isFile() && isJavaScriptFile(entryFilename)) {
          const pagePath = path.relative(pagesPath, entryPath)
          console.log(`Rendering page "${pagePath}"…`)
          await generatePage(pagePath)
        } else if (stats.isDirectory()) {
          nextDirectoryPaths.push(entryPath)
        }
      }
    }
    directoryPaths = nextDirectoryPaths
    nextDirectoryPaths = []
  }

  console.log("Done rendering pages.")
}

function isJavaScriptFile(filePath) {
  return [".js", ".mjs", ".cjs"].includes(path.extname(filePath))
}

async function renderPageOrDeleteOutput(pagePath) {
  try {
    console.log(`Rendering page "${pagePath}"…`)
    await generatePage(pagePath)
    console.log(`Done rendering page "${pagePath}".`)
  } catch (error) {
    console.error(`Failed rendering page "${pagePath}".`)
    if (error.code === "ERR_MODULE_NOT_FOUND") {
      await deleteOutput(pagePath)
    } else {
      throw error
    }
  }
}

async function generatePage(pagePath) {
  await writePageOutput(pagePath, await renderPage(pagePath))
}

async function renderPage(pagePath) {
  const module = await loadPageModule(pagePath)
  const renderer = createRendererContext(pagePath)
  return await module.render(renderer)
}

async function loadPageModule(pagePath) {
  const pageSourcePath = getPageSourcePath(pagePath)
  return await import(pageSourcePath)
}

function getPageSourcePath(pagePath) {
  return path.join(rootPath, pagesDirectoryName, pagePath)
}

function createRendererContext(pagePath) {
  return {
    getPagePath() {
      return pagePath
    },
  }
}

async function writePageOutput(pagePath, output) {
  await writeOutput(getPageDestinationPath(pagePath), output)
}

function getPageDestinationPath(pagePath) {
  return path.join(
    rootPath,
    path.dirname(pagePath),
    path.basename(pagePath, path.extname(pagePath)) + ".html"
  )
}

async function writeOutput(outputPath, output) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, output, { encoding: "utf8" })
}

async function deleteOutput(pagePath) {
  const pageDestinationPath = getPageDestinationPath(pagePath)
  console.log(`Removing "${pageDestinationPath}" and empty parent directories…`)
  await removeFileAndEmptyDirectories(pageDestinationPath)
  console.log(`Removed "${pageDestinationPath}" and empty parent directories.`)
}

async function removeFileAndEmptyDirectories(filePath) {
  try {
    await removeFile(filePath)
  } catch (error) {
    return
  }
  await removeEmptyDirectoriesUpTo(path.dirname(filePath), pagesPath)
}

async function removeFile(filePath) {
  await fs.unlink(filePath)
}

async function removeEmptyDirectoriesUpTo(directoryPath, upToPath) {
  if (isSubdirectory(upToPath, directoryPath)) {
    let remainingPath = path.relative(pagesPath, path.resolve(directoryPath))
    try {
      while (remainingPath !== ".") {
        await fs.rmdir(path.join(upToPath, remainingPath))
        remainingPath = path.dirname(remainingPath)
      }
    } catch (error) {}
  } else {
    throw new Error(
      `upToPath ("${upToPath}") must be a subdirectory of directoryPath ("${directoryPath}").`
    )
  }
}

function isSubdirectory(directoryPath, pathToCheckAgainst) {
  directoryPath = path.resolve(directoryPath)
  pathToCheckAgainst = path.resolve(pathToCheckAgainst)
  return (
    directoryPath.substring(0, pathToCheckAgainst.length) === pathToCheckAgainst
  )
}

function run(fn) {
  fn()
}
