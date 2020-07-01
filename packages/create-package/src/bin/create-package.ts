#!/usr/bin/env node

import { createPackage } from '../createPackage'

createPackage().catch(console.error)
