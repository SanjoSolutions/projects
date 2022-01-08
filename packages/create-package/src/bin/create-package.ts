#!/usr/bin/env node

import { createPackage } from '../createPackage.js'

createPackage().catch(console.error)
