describe('compareImage', () => {
  it('', () => {
    const actualImage = [0, 0, 0, 0]
    const expectedImage = [0, 0, 0, 0]
    const diff = compareImage(actualImage, expectedImage)
    expect(diff).toEqual([, , ])
  })

  it('', () => {
    const actualImage = [255, 0, 0, 1]
    const expectedImage = [0, 255, 0, 1]
    const diff = compareImage(actualImage, expectedImage)
    expect(diff).toEqual([[255, 0], [0, 255], 0, 1])
  })
})
