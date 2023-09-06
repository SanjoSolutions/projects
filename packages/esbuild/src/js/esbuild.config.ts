import { config as baseConfig } from "../esbuild.config.js"

export const config = {
  ...baseConfig,
  entryPoints: ["src/index.js"],
}
