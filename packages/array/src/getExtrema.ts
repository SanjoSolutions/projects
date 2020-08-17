import identity from '@sanjo/identity';

export function getExtrema (array, getter = identity, isMoreExtreme) {
  if (array.length === 0) {
    return null;
  }

  let extremeIndex = 0;
  let extremeValue = getter(array[0]);
  for (let index = 1; index < array.length; index++) {
    const value = getter(array[index]);
    if (isMoreExtreme(value, extremeValue)) {
      extremeIndex = index;
      extremeValue = value;
    }
  }

  return array[extremeIndex];
}
