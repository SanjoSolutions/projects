import { retrieveDefaultConfigForProduction } from "./esbuild.config.js"
import { build } from "./index.js"

build(retrieveDefaultConfigForProduction())
