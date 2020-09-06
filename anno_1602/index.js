const A = {
  a: 2,
  b: -1
}

const B = {
  b: 1
}

const _ = [A, B]

function t(_) {
  return sum(_)
}

function p(t, o) {
  return times(t, o)
}


function sum(array) {
  if (typeof array[0] === 'number') {
    return sumNumbers(array)
  } else {
    return sumObjects(array)
  }
}

function sumObjects(objects) {
  const keys = new Set(objects.map(object => Object.keys(object)).flat())
  return Object.fromEntries(keys.map(key => [key, sum(objects.map(object => object[key]))]))
}

function sumNumbers(numbers) {
  return numbers.reduce(plus)
}

function plus(a, b) {
  return a + b
}

function times(number, object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, number * value])
  )
}
