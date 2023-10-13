const { spawn } = require("child_process")
// const esbuild = require("esbuild")

async function main() {
  const args = process.argv.slice(2)

  spawn("compose", [...args], {
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

  // await esbuild.build({
  //   entryPoints: ["index.js"],
  //   bundle: true,
  //   outdir: outputPath,
  //   format: "esm",
  // })
}

main()
