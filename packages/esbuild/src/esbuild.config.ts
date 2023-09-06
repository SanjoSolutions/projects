import type { Format } from "esbuild"
import { polyfillNode } from "esbuild-plugin-polyfill-node"

export const config = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "public/build",
  plugins: [polyfillNode()],
  format: "esm" as Format,
  target: ["chrome116"],
}
