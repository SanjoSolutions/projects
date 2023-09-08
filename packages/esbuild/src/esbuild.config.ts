import type { Format } from "esbuild"
import { polyfillNode } from "esbuild-plugin-polyfill-node"

export const config = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "public/build",
  plugins: [polyfillNode()],
  format: "esm" as Format,
  target: ["chrome116"],
  define: {
    "window.IS_DEVELOPMENT": "false",
  },
}

export function retrieveDefaultConfigForDevelopment() {
  return {
    ...config,
    define: {
      ...config.define,
      "window.IS_DEVELOPMENT": "false",
    },
  }
}

export function retrieveDefaultConfigForProduction() {
  return {
    ...config,
  }
}
