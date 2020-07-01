const puppeteer = {
  launch () {
    return Promise.resolve({
      newPage () {
        return {
          goto: jest.fn(),
        }
      },
    })
  },
}

export default puppeteer
