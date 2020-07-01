function series1 (to) {
  const numbers = new Array(to)
  let index = 0
  let number = 1
  while (number <= to) {
    numbers[index] = number
    index++
    number++
  }
  return numbers
}

console.log(series1(3))
