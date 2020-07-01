const mathRandom = Math.random
let isMathRandomMocked = false

export function letMathRandomReturn(numbersToReturn) {
    numbersToReturn = Array.from(numbersToReturn)
    mockMathRandom(function () {
        if (numbersToReturn.length >= 1) {
            return numbersToReturn.shift()
        } else {
            throw new Error('No more numbers to return.')
        }
    })
}

export function mockMathRandom(mathRandomMock) {
    if (isMathRandomMocked) {
        throw new Error('Math.random is already mocked.')
    }
    Math.random = mathRandomMock.bind(Math)
    isMathRandomMocked = true
}

export function unmockMathRandom() {
    Math.random = mathRandom
    isMathRandomMocked = false
}
