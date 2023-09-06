#!/usr/bin/env node

import { createBrowserPackage } from "../createBrowserPackage.js"

createBrowserPackage().catch(console.error)
