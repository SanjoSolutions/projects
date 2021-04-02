module.exports = {
  *counterPlus1() {
    let counter = 1
    while (true) {
      yield counter
      counter++
    }
  },
}
