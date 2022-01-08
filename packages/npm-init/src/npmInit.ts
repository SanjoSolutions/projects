import exec from '@sanjo/exec'

export async function npmInit(rootPath: string, createPackageName: string, args: string[]): Promise<void> {
  let command = `npx '${createPackageName}'`
  const argsString = args.map(arg => `'${arg}'`).join(' ')
  if (argsString.length >= 1) {
    command += ` ${argsString}`
  }
  console.log(`exec: ${command}, cwd: ${rootPath}`)
  const { stdout, stderr } = await exec(command, { cwd: rootPath })
  if (stdout) {
    console.log('stdout: ' + stdout)
  }
  if (stderr) {
    console.error('stderr: ' + stderr)
  }
}
