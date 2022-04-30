#!/usr/bin/env node

import { removeExportsWhichAreOnlyImportedByTests } from '../index.js'

await removeExportsWhichAreOnlyImportedByTests()
