import type { ChildProcess } from "child_process"
import child_process, { ExecOptions } from "child_process"

export async function exec(
  command: string,
  options: ExecOptions
): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const server = child_process.exec(
      command,
      options,
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else if (stderr) {
          reject(new Error(stderr))
        }
      }
    )
    resolve(server)
  })
}
