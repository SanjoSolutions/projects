export function partial(fn, ...partialArgs) {
  return (...args) => {
    return fn(...partialArgs, ...args);
  };
}
