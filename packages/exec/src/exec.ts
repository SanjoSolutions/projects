import type { ExecOptions } from 'child_process'
import child_process from 'child_process'

export async function exec(command: string, options: ExecOptions = {}): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    child_process.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
