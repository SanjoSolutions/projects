import { describe, expect, it } from '@jest/globals'
import { fix } from './fix.js'

describe('fix', () => {
  it('adds missing keyword field', () => {
    const packageJSON = {}
    const packagePath = 'packages/test'
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(fixedPackageJSON).toHaveProperty('keywords', [])
  })

  it('adds missing license field', () => {
    const packageJSON = {}
    const packagePath = 'packages/test'
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(fixedPackageJSON).toHaveProperty('license', 'Unlicense')
  })

  it('adds missing repository field', () => {
    const packageJSON = {}
    const packagePath = 'packages/test'
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(fixedPackageJSON).toHaveProperty('repository', {
      type: 'git',
      url: 'https://github.com/SanjoSolutions/unnamed.git',
      directory: 'packages/test',
    })
  })

  it('adds missing homepage field', () => {
    const packagePath = 'packages/test'
    const packageJSON = {}
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(fixedPackageJSON).toHaveProperty(
      'homepage',
      'https://github.com/SanjoSolutions/unnamed/tree/main/packages/test'
    )
  })

  it('existing fields on the input are also on the output', () => {
    const packageJSON = {
      name: '@sanjo/test',
    }
    const packagePath = 'packages/test'
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(fixedPackageJSON).toHaveProperty('name', '@sanjo/test')
  })

  it('sorts fields', () => {
    const packageJSON = {
      name: '@sanjo/tagged-template-literals',
      type: 'module',
      keywords: ['tagged template literals'],
      version: '1.0.1',
      license: 'Unlicense',
      description: 'Utility functions for tagged template literals',
      repository: {
        type: 'git',
        url: 'https://github.com/SanjoSolutions/unnamed.git',
        directory: 'packages/tagged-template-literals',
      },
      types: './index.d.ts',
      homepage: 'https://github.com/SanjoSolutions/unnamed/tree/main/packages/tagged-template-literals',
      main: './index.js',
      publishConfig: {
        access: 'public',
      },
    }
    const packagePath = 'packages/tagged-template-literals'
    const fixedPackageJSON = fix(packageJSON, packagePath)
    expect(Object.entries(fixedPackageJSON)).toEqual(
      Object.entries({
        name: '@sanjo/tagged-template-literals',
        version: '1.0.1',
        type: 'module',
        description: 'Utility functions for tagged template literals',
        keywords: ['tagged template literals'],
        homepage: 'https://github.com/SanjoSolutions/unnamed/tree/main/packages/tagged-template-literals',
        license: 'Unlicense',
        main: './index.js',
        repository: {
          type: 'git',
          url: 'https://github.com/SanjoSolutions/unnamed.git',
          directory: 'packages/tagged-template-literals',
        },
        types: './index.d.ts',
        publishConfig: {
          access: 'public',
        },
      })
    )
  })
})
