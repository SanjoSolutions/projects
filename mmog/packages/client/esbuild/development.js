import { development } from "@sanjo/esbuild"
import { retrieveDefaultConfigForDevelopment } from "@sanjo/esbuild/esbuild.config.js"
import { additionalDefines } from "./additionalDefines.js"

const defaultConfig = retrieveDefaultConfigForDevelopment()

development({
  ...defaultConfig,
  entryPoints: ["src/index.tsx"],
  define: {
    ...defaultConfig.define,
    ...additionalDefines,
  },
})
