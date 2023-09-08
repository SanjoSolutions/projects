import { retrieveDefaultConfigForDevelopment } from "./esbuild.config.js"
import { development } from "./index.js"

development(retrieveDefaultConfigForDevelopment())
