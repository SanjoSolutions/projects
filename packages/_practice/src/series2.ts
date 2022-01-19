export {}

function series2(to: number) {
  const numbers = []
  for (let number = 1; number <= to; number++) {
    numbers.push(number)
  }
  return numbers
}

console.log(series2(3))
