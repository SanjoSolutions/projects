function formatArray(array) {
  const formattedArray = '[' + array.map(formatValue).join(', ') + ']'
  if (formattedArray.length > 120) {
    return formatArrayChoppedDown(array)
  } else {
    return formattedArray
  }
}

function formatArrayChoppedDown(array) {
  return '[\n' + array.map(value => formatValue(value).replace(/^/gm, '  ')).join(',\n') + '\n]'
}

function formatValue(value) {
  if (typeof value === 'object') {
    return formatObject(value)
  } else {
    return formatPrimitive(value)
  }
}

function formatObject(object) {
  let formattedObject =
    '{' +
    Object.entries(object)
      .map(([key, value]) => key + ': ' + formatValue(value))
      .join(', ') +
    '}'
  if (formattedObject.length > 120) {
    return formatObjectChoppedDown(object)
  } else {
    return formattedObject
  }
}

function formatObjectChoppedDown(object) {
  return (
    '{\n' +
    Object.entries(object)
      .map(([key, value]) => '  ' + key + ': ' + formatValue(value))
      .join(',\n') +
    '\n}'
  )
}

function formatPrimitive(value) {
  return JSON.stringify(value)
}

function generateBigObject() {
  const object = {}
  const firstKey = 'A'
  const firstKeyCode = firstKey.charCodeAt(0)
  for (let keyCharCode = firstKeyCode; keyCharCode <= firstKeyCode + 120; keyCharCode++) {
    const charCode = String.fromCharCode(keyCharCode)
    object[charCode] = 1
  }
  return object
}

describe('formatArray', () => {
  it('puts a space after the comma when string length <= 120 characters', () => {
    const array = [1, 2, 3]
    expect(formatArray(array)).toEqual('[1, 2, 3]')
  })

  it('chops array when string length > 120 characters', () => {
    const array = new Array(120).fill(1)
    expect(formatArray(array)).toEqual('[\n' + '  1,\n'.repeat(119) + '  1\n' + ']')
  })

  it('display objects', () => {
    const array = [{ a: 1 }]
    expect(formatArray(array)).toEqual('[{a: 1}]')
  })

  it('chops object when string length > 120', () => {
    const object = generateBigObject()
    const array = [object]
    const keyValuePairs = Object.entries(object)
    expect(formatArray(array)).toEqual(
      '[\n' + '  {\n' + keyValuePairs.map(([key, value]) => '    ' + key + ': ' + value).join(',\n') + '\n  }\n' + ']'
    )
  })
})

describe('formatObject', () => {
  it('chops down long objects', () => {
    const object = generateBigObject()
    const keyValuePairs = Object.entries(object)
    expect(formatObject(object)).toEqual(
      '{\n' + keyValuePairs.map(([key, value]) => '  ' + key + ': ' + value).join(',\n') + '\n}'
    )
  })
})
