import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { getWebServerPort } from '../lib/testing/getWebServerPort.js'
import { determineDirname } from '../lib/determineDirname.js'

const __dirname = determineDirname(import.meta.url)

export default async function () {
  const webServerPort = await getWebServerPort()
  global.__WEB_SERVER__ = spawn('python3', ['-m', 'http.server', webServerPort], {
    cwd: path.resolve(__dirname, '..'),
  })
  const logFile = await fs.createWriteStream(path.resolve(__dirname, '../../web_server.log'), { flags: 'w' })
  global.__WEB_SERVER__.stdout.pipe(logFile)
  global.__WEB_SERVER__.stderr.pipe(logFile)
}
