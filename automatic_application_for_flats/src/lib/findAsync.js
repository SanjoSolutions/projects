export async function findAsync(iterable, matcher) {
  for (const value of iterable) {
    if (await matcher(value)) {
      return value;
    }
  }
  return null;
}
