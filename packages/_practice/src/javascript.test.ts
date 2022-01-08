export {}

test('JavaScript', () => {
  let array = []
  array.push('a')
  array.push('b')
  array.unshift(0)
  array = array.slice(1)
  array = array.map(value => '_' + value)
  expect(array).toEqual(['_a', '_b'])
})

function soWas(numberOfLines: number, character: string): string {
  return series(numberOfLines)
    .map(lineNumber => character.repeat(lineNumber) + '\n')
    .join('')
}

function soWasÄhnliches(numberOfLines: number, character: string): string {
  return series(numberOfLines)
    .map((lineNumber, index) => {
      if (isEven(index)) {
        return character.repeat(lineNumber) + '\n'
      } else {
        return character.repeat(lineNumber - 1) + character.toLowerCase() + '\n'
      }
    })
    .join('')
}

function soWasGanzAnderes(numberOfLines: number, character: string): string {
  return series(numberOfLines)
    .map(lineNumber => {
      let line = ''
      for (let index = 0; index < lineNumber; index++) {
        line += isEven(index) ? character : character.toLowerCase()
      }
      line += '\n'
      return line
    })
    .join('')
}

function isEven(number: number): boolean {
  return number % 2 === 0
}

test('isEven', () => {
  expect(isEven(0)).toEqual(true)
  expect(isEven(2)).toEqual(true)
})

function series(to: number): number[] {
  const numbers = new Array(to)
  for (let number = 1; number <= to; number++) {
    numbers[number - 1] = number
  }
  return numbers
}

test('soWas', () => {
  expect(soWas(3, '0')).toEqual('0\n' + '00\n' + '000\n')

  expect(soWas(3, 'X')).toEqual('X\n' + 'XX\n' + 'XXX\n')
})

test('sowasÄhnliches', () => {
  expect(soWasÄhnliches(3, 'X')).toEqual('X\n' + 'Xx\n' + 'XXX\n')
})

test('sowasGanzAnderes', () => {
  expect(soWasGanzAnderes(3, 'X')).toEqual('X\n' + 'Xx\n' + 'XxX\n')
})
