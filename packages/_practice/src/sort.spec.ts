function sort(values) {
  debugger;
  if (values.length <= 1) {
    return values;
  }

  const index = Math.floor(values.length / 2);
  const valuesLeft = values.slice(0, index);
  const valuesRight = values.slice(index);
  const sortedValuesLeft = sort(valuesLeft);
  const sortedValuesRight = sort(valuesRight);
  const sortedValues = new Array(values.length);
  let currentSortedValueIndex = 0;
  const length = Math.max(sortedValuesLeft.length, sortedValuesRight.length);
  for (let index = 0; index < length; index++) {
    const sortedValueLeft = sortedValuesLeft[index];
    const sortedValueRight = sortedValuesRight[index];
    if (
      index < sortedValuesLeft.length &&
      sortedValueLeft <= sortedValueRight
    ) {
      sortedValues[currentSortedValueIndex++] = sortedValueLeft;
      sortedValues[currentSortedValueIndex++] = sortedValueRight;
    } else {
      sortedValues[currentSortedValueIndex++] = sortedValueRight;
      if (sortedValueLeft) {
        sortedValues[currentSortedValueIndex++] = sortedValueLeft;
      }
    }
  }
  return sortedValues;
}

describe("sort", () => {
  it("sorts", () => {
    expect(sort([2, 3, 4, 1, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});
