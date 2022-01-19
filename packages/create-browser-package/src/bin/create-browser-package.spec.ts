import testCreatePackage from '@sanjo/test-create-package'
import path from 'path'

// This uses the built version.

const packageName = '@sanjo/test-package'
const packageDescription = 'Description of test package'
testCreatePackage('@sanjo/create-browser-package', path.resolve(__dirname, '../..'), [packageName, packageDescription])
