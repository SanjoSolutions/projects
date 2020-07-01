import { replaceStringValues } from './replaceStringValues.js'

describe('replaceStringValues', () => {
  const xmlKeys = [
    'android:text',
    'android:label',
    'android:key',
    'android:title',
    'android:summary',
    'android:hint',
    'android:contentDescription'
  ]

  for (const xmlKey of xmlKeys) {
    it('replaces string values with its references', () => {
      const lookUp = new Map([
        ['Login Activity', 'lgn_act']
      ])
      expect(replaceStringValues(lookUp, `${xmlKey}="Login Activity"`)).toEqual(
        {text: `${xmlKey}="@string/lgn_act"`, errors: []}
      )
    })
  }

  it('replaces multiple occurrences', () => {
    const lookUp = new Map([
      ['Login Activity', 'lgn_act'],
      ['Register Me Too', 'rgst_me']
    ])
    expect(replaceStringValues(lookUp, 'android:text="Login Activity" android:label="Register Me Too"')).toEqual(
      {text: `android:text="@string/lgn_act" android:label="@string/rgst_me"`, errors: []}
    )
  })

  it('works with whitespaces, tabs and line breaks before and after the equal sign that is between the key and value',
    () => {
      const lookUp = new Map([
        ['Login Activity', 'lgn_act']
      ])
      expect(replaceStringValues(lookUp, 'android:text  \t \n \r\n  \r=  \t \n \r\n  \r"Login Activity"')).toEqual(
        {text: 'android:text  \t \n \r\n  \r=  \t \n \r\n  \r"@string/lgn_act"', errors: []}
      )
    }
  )

  it('returns an error when string value has not been found in look-up', () => {
    const lookUp = new Map([])
    expect(replaceStringValues(lookUp, 'android:text="Login Activity"')).toEqual(
      {
        text: 'android:text="Login Activity"',
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
