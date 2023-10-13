const { spawn } = require("child_process")
const http = require("http")
// const esbuild = require("esbuild")
const fs = require("fs/promises")
const path = require("path")
const serveStatic = require("serve-static")
const finalHandler = require("finalhandler")

async function main() {
  const args = process.argv.slice(2)

  spawn("compose", ["--watch", ...args], {
    stdio: "inherit",
    shell: true,
  })

  const outputIndex = args.indexOf("--output")
  let outputPath
  if (outputIndex !== -1 && outputIndex + 1 < args.length) {
    outputPath = args[outputIndex + 1]
  } else {
    outputPath = process.cwd()
  }

  spawn("auto-reload", [], {
    stdio: "inherit",
    shell: true,
    cwd: outputPath,
  })

  // const ctx = await esbuild.context({
  //   entryPoints: ["index.js"],
  //   outdir: outputPath,
  //   bundle: true,
  //   format: "esm",
  // })

  // ctx.watch()

  let reloadJs = null

  const serve = serveStatic(outputPath)

  http
    .createServer(async (req, res) => {
      if (req.url === "/reload.js") {
        if (!reloadJs) {
          reloadJs = await fs.readFile(
            require.resolve("@sanjo/auto-reload/reload.js"),
            {
              encoding: "utf-8",
            },
          )
        }
        res.writeHead(200, { "Content-Type": "text/javascript" })
        res.end(reloadJs)
        return
      } else if (
        req.url.endsWith("/") ||
        req.url.endsWith(".html") ||
        req.url.endsWith(".htm")
      ) {
        try {
          let filePath = path.join(outputPath, req.url)
          let content
          if (req.url.endsWith("/")) {
            content = await readIndexFile(filePath)
          } else {
            content = await fs.readFile(filePath, {
              encoding: "utf-8",
            })
          }

          const match = /<\w*\/\w*body\w*>/i.exec(content)
          if (match) {
            content =
              content.slice(0, match.index) +
              `<script src="/reload.js"></script>` +
              content.slice(match.index)
          } else {
            content += `<script src="/reload.js"></script>`
          }

          res.writeHead(200, { "Content-Type": "text/html" })
          res.end(content)
        } catch (error) {
          if (error.code === "ENOENT") {
            res.writeHead(404)
            res.end()
          } else {
            finalHandler(req, res)(error)
          }
        }
      } else {
        serve(req, res, finalHandler(req, res))
      }
    })
    .listen(3000)

  console.log("Website is served on http://localhost:3000.")
}

async function readIndexFile(directoryPath) {
  try {
    return await fs.readFile(path.join(directoryPath, "index.html"), {
      encoding: "utf-8",
    })
  } catch (error) {
    if (error.code === "ENOENT") {
      return await fs.readFile(path.join(directoryPath, "index.htm"), {
        encoding: "utf-8",
      })
    } else {
      throw error
    }
  }
}

main()
