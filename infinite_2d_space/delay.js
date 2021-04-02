export function delay(f, delay) {
  let handler = undefined;
  return (...args) => {
    if (!handler) {
      handler = setTimeout(() => {
        handler = undefined;
        f(...args);
      }, delay);
    }
  };
}
