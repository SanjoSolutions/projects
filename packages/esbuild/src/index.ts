import type { BuildOptions, SameShape } from "esbuild"
import * as esbuild from "esbuild"

export function build<T extends BuildOptions>(
  config: SameShape<BuildOptions, T>,
): Promise<esbuild.BuildResult<T>> {
  return esbuild.build({
    define: {
      "window.IS_DEVELOPMENT": "false",
    },
    ...config,
  })
}

export async function development<T extends BuildOptions>(
  config: SameShape<BuildOptions, T>,
): Promise<void> {
  const context = await esbuild.context({
    sourcemap: true,
    define: {
      "window.IS_DEVELOPMENT": "true",
    },
    ...config,
  })

  await context.watch()
  const port = 80
  await context.serve({ port, servedir: "public" })
  let url = "http://localhost"
  if (port !== 80) {
    url += `:${port}`
  }
  console.log(`Running on ${url}.`)
}
