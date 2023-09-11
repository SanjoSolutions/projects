import childProcess from "node:child_process"
import { promisify } from "node:util"

export const exec = promisify(childProcess.exec)
export const execFile = promisify(childProcess.execFile)
