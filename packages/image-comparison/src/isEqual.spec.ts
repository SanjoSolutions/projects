function isEqual(imageA: number[], imageB: number[]): boolean {
  return arrayDiff;
}

describe("isEqual", () => {
  it("determines if two images are equal", () => {
    const imageA = [];
    const imageB = [];
    expect(isEqual(imageA, imageB)).toEqual(true);
  });
});
