import { SearchResult } from "./SearchResult";

export function binarySearch<T>(
  list: T[],
  compareFn: (a: T, b: T) => number,
  value: T
): SearchResult<T> {
  let subList = list;
  let index;
  while (subList.length >= 1) {
    index = Math.floor(subList.length / 2);
    const valueAtIndex = subList[index];
    const compareResult = compareFn(value, valueAtIndex);
    if (compareResult === 0) {
      return { index, value: valueAtIndex };
    } else if (compareResult < 0) {
      subList = subList.slice(0, index);
    } else {
      subList = subList.slice(index + 1);
    }
  }
  return {
    index: -1,
    value: null,
  };
}
