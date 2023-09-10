import { build } from "@sanjo/esbuild"
import { retrieveDefaultConfigForProduction } from "@sanjo/esbuild/esbuild.config.js"
import { additionalDefines } from "./additionalDefines.js"

const defaultConfig = retrieveDefaultConfigForProduction()

const config = {
  ...defaultConfig,
  entryPoints: ["src/index.tsx"],
  define: {
    ...defaultConfig.define,
    ...additionalDefines,
  },
}

build(config)
