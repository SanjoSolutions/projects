#!/usr/bin/env node

import { createBrowserPackage } from "../createBrowserPackage";

createBrowserPackage().catch(console.error);
