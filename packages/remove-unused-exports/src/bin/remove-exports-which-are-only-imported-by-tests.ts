#!/usr/bin/env node

import { removeExportsWhichAreOnlyImportedByTests } from "../removeExportsWhichAreOnlyImportedByTests.js"

await removeExportsWhichAreOnlyImportedByTests()
