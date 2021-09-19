export function throttle(fn, delay) {
  let handle = null

  function throttledFn(...args) {
    if (handle) {
      clearTimeout(handle)
    }
    handle = setTimeout(() => {
      fn(...args)
      handle = null
    }, delay)
  }

  throttledFn.cancel = function () {
    if (handle) {
      clearTimeout(handle)
      handle = null
    }
  }

  return throttledFn
}
