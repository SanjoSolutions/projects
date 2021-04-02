import { promises as fs } from "fs"

function escapeRegExpText(text) {
  return text.replace(
    new RegExp("[\\[\\]().*+\\\\]", "g"),
    (character) => `\\${character}`
  )
}

;(async function () {
  const operation = process.argv[2]

  if (operation === "compress") {
    const filePathToCompress = process.argv[3]
    const filePathToSaveCompressedFile = process.argv[4]

    const text = await fs.readFile(filePathToCompress, { encoding: "utf8" })

    const map = new Map()

    const minLength = 3
    for (let index = 0; index < text.length; index++) {
      if (!text.substring(index, index + minLength).includes("\n")) {
        for (let length = minLength; length <= text.length - index; length++) {
          if (text[index + length - 1] === "\n") {
            break
          }
          const token = text.substring(index, index + length)
          if (map.has(token)) {
            map.set(token, map.get(token) + 1)
          } else {
            map.set(token, 1)
          }
        }
      }
    }

    let tokens = [...map]

    tokens = tokens.map(([token, count]) => {
      return [
        token,
        count,
        count * token.length - (2 + token.length + 1 + count * 3),
      ]
    })

    tokens = tokens.filter(
      ([token, count, charactersSaved]) => charactersSaved > 0
    )

    tokens.sort((a, b) => {
      if (a[0].includes(b[0])) {
        return -1
      } else if (b[0].includes[a[0]]) {
        return 1
      } else {
        return b[2] - a[2]
      }
    })

    console.log(tokens)

    let header = ""
    let compressedText = text
    let nextCompressedText

    let tokenIndex = 0
    for (const [token] of tokens) {
      let replaceCount = 0
      const headerLine = `${tokenIndex}:${token}\n`
      nextCompressedText = compressedText.replace(
        new RegExp(escapeRegExpText(token), "g"),
        () => {
          replaceCount++
          return `\0${tokenIndex}\0`
        }
      )
      if (
        headerLine.length + nextCompressedText.length <
        compressedText.length
      ) {
        header = header + headerLine
        compressedText = nextCompressedText
        tokenIndex++
      }
    }
    compressedText = header + "\n" + compressedText

    console.log(`Characters saved: ${text.length - compressedText.length}`)

    await fs.writeFile(filePathToSaveCompressedFile, compressedText, {
      encoding: "utf8",
    })
  } else if (operation === "decompress") {
    const filePathToDecompress = process.argv[3]
    const filePathToSaveDecompressedFile = process.argv[4]

    let compressedText = await fs.readFile(filePathToDecompress, {
      encoding: "utf8",
    })

    const indexOfHeaderSeparator = compressedText.indexOf("\n\n")
    const header = compressedText.substring(0, indexOfHeaderSeparator)
    compressedText = compressedText.substring(indexOfHeaderSeparator + 2)

    let tokens = header.split("\n").map((headerLine) => {
      const separatorIndex = headerLine.indexOf(":")
      return [
        Number(headerLine.substring(0, separatorIndex)),
        headerLine.substring(separatorIndex + 1),
      ]
    })

    tokens = tokens.reverse()

    let text = compressedText
    for (const [tokenIndex, token] of tokens) {
      text = text.replace(new RegExp(`\0${tokenIndex}\0`, "g"), token)
    }

    await fs.writeFile(filePathToSaveDecompressedFile, text, {
      encoding: "utf8",
    })
  }
})()
