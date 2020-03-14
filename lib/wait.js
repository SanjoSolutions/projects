module.export = {
  async wait (howLongInMs) {
    return new Promise(resolve => setTimeout(resolve, howLongInMs))
  }
}
