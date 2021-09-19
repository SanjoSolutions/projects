export function throttle(fn, delay) {
  let handle
  return (...args) => {
    if (handle) {
      clearTimeout(handle)
    }
    handle = setTimeout(() => {
      fn(...args)
      handle = null
    }, delay)
  }
}
