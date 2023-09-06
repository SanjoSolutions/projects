import { promises as fs } from "fs"

export async function readJSON(path) {
  return JSON.parse(await fs.readFile(path, { encoding: "utf8" }))
}
