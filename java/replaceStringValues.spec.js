import { replaceStringValues } from './replaceStringValues.js'

describe('replaceStringValues', () => {
  it('replaces string values with its references', () => {
    const lookUp = new Map([
      ['Login Activity', 'lgn_act']
    ])
    expect(replaceStringValues(lookUp, `"Login Activity"`)).toEqual({text: 'R.string.lgn_act', errors: []})
  })

  it('replaces multiple occurrences', () => {
    const lookUp = new Map([
      ['Login Activity', 'lgn_act'],
      ['Register Me Too', 'rgst_me']
    ])
    expect(replaceStringValues(lookUp, `"Login Activity" "Register Me Too"`))
      .toEqual({text: 'R.string.lgn_act R.string.rgst_me', errors: []})
  })

  it('ignores empty strings ("")', () => {
    const lookUp = new Map([])
    expect(replaceStringValues(lookUp, '""')).toEqual({text: '""', errors: []})
  })

  it('ignores lines that start with "Log"', () => {
    const lookUp = new Map([
      ['Login Activity', 'lgn_act']
    ])
    expect(replaceStringValues(lookUp, 'Log.d("Login Activity")'))
      .toEqual({text: 'Log.d("Login Activity")', errors: []})
  })

  it('ignores lines that start with a commented "Log"', () => {
    const lookUp = new Map([
      ['Login Activity', 'lgn_act']
    ])
    expect(replaceStringValues(lookUp, '\t //\t Log.d("Login Activity")'))
      .toEqual({text: '\t //\t Log.d("Login Activity")', errors: []})
  })

  it('returns an error when string value has not been found in look-up', () => {
    const lookUp = new Map([])
    expect(replaceStringValues(lookUp, '"Login Activity"')).toEqual(
      {
        text: '"Login Activity"',
        errors: [
          {
            stringValue: 'Login Activity',
            lineNumber: 1
          }
        ]
      }
    )
  })
})
