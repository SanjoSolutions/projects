import { extractFunctions } from './extractFunctions.js'

describe('extract functions', () => {
  it.only('extracts a function', () => {
    const code = `function humanToCamelCase (string) {
  const words = string.split(' ')
  return words[0] + words.slice(1).map(function capitalizeFirstLetter (word) {
    return word[0].toUpperCase() + word.substring(1)
  })
}

describe('humanToCamelCase', () => {
  it('transforms a human string to a camel case string', () => {
    expect(humanToCamelCase('hello world')).toEqual('helloWorld')
  })
})
`
    const extractFromFilename = 'human-to-camel-case.spec.js'
    const functionNameToExtract = 'humanToCamelCase'
    const outputFiles = extractFunctions(
      { filename: extractFromFilename, code },
      functionNameToExtract,
    )

    const extractedFromFileCode = `import { humanToCamelCase } from "./humanToCamelCase.js";
describe('humanToCamelCase', () => {
  it('transforms a human string to a camel case string', () => {
    expect(humanToCamelCase('hello world')).toEqual('helloWorld');
  });
});`
    const exportedFunctionFileCode = `export function humanToCamelCase(string) {
  const words = string.split(' ');
  return words[0] + words.slice(1).map(function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.substring(1);
  });
}`
    expect(outputFiles).toEqual([
      { filename: extractFromFilename, code: extractedFromFileCode },
      { filename: `./${functionNameToExtract}.js`, code: exportedFunctionFileCode },
    ])
  })

  it(
    'does not import the function in the file from where the function has been extraced if the function is not used in the file the function has been extraced from',
    () => {
      const code = `function humanToCamelCase (string) {
  const words = string.split(' ')
  return words[0] + words.slice(1).map(function capitalizeFirstLetter (word) {
    return word[0].toUpperCase() + word.substring(1)
  })
}
`
      const extractFromFilename = 'human-to-camel-case.spec.js'
      const functionNameToExtract = 'humanToCamelCase'
      const outputFiles = extractFunctions(
        { filename: extractFromFilename, code },
        functionNameToExtract,
      )

      const extractedFromFileCode = ``
      const exportedFunctionFileCode = `export function humanToCamelCase(string) {
  const words = string.split(' ');
  return words[0] + words.slice(1).map(function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.substring(1);
  });
}`
      expect(outputFiles).toEqual([
        { filename: extractFromFilename, code: extractedFromFileCode },
        { filename: `./${functionNameToExtract}.js`, code: exportedFunctionFileCode },
      ])
    },
  )

  it(
    'imports the dependendies of the extracted function as done in the extractedFrom file' +
    ' and it removes unused imports from the extractedFrom file that have been added to the extracedFunctionFile.',
    () => {
      const code = `import { c } from './c.js'
import { d } from './d.js'
import { e, f } from './ef.js'

export function a () {
  c()
  d()
  e()
}

export function b () {
  c()
  f()
}
`
      const extractFromFilename = 'index.js'
      const functionNameToExtract = 'a'
      const outputFiles = extractFunctions(
        { filename: extractFromFilename, code },
        functionNameToExtract,
      )

      const extractedFromFileCode = `import { c } from './c.js';
import { f } from './ef.js';
export function b() {
  c();
  f();
}`
      const exportedFunctionFileCode = `import { c } from './c.js';
import { d } from './d.js';
import { e } from './ef.js';
export function a() {
  c();
  d();
  e();
}`
      expect(outputFiles).toEqual([
        { filename: extractFromFilename, code: extractedFromFileCode },
        { filename: `./${functionNameToExtract}.js`, code: exportedFunctionFileCode },
      ])
    },
  )

  it('can extract multiple functions', () => {
    const code = `export function a () {

}

export function b () {

}

export function c () {

}
`
    const extractFromFilename = 'index.js'
    const functionNamesToExtract = ['a', 'b', 'c']
    const outputFiles = extractFunctions(
      { filename: extractFromFilename, code },
      functionNamesToExtract,
    )

    const extractedFromFileCode = ``
    const exportedFunctionAFileCode = `export function a() {}`
    const exportedFunctionBFileCode = `export function b() {}`
    const exportedFunctionCFileCode = `export function c() {}`

    expect(outputFiles).toEqual([
      { filename: extractFromFilename, code: extractedFromFileCode },
      { filename: `./${functionNamesToExtract[0]}.js`, code: exportedFunctionAFileCode },
      { filename: `./${functionNamesToExtract[1]}.js`, code: exportedFunctionBFileCode },
      { filename: `./${functionNamesToExtract[2]}.js`, code: exportedFunctionCFileCode },
    ])
  })
})

// Move JSDoc comment with function
// E.g.
//  /**
//   * Test
//   */
