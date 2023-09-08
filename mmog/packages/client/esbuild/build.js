import { build } from "@sanjo/esbuild"
import { retrieveDefaultConfigForProduction } from "@sanjo/esbuild/esbuild.config.js"
import { additionalDefines } from "./additionalDefines.js"

const defaultConfig = retrieveDefaultConfigForProduction()

build({
  ...defaultConfig,
  define: {
    ...defaultConfig.define,
    ...additionalDefines,
  },
})
