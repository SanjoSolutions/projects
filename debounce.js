export function debounce(fn, delay) {
  let handle = null

  function debounceFn(...args) {
    if (handle) {
      clearTimeout(handle)
    }
    handle = setTimeout(() => {
      fn(...args)
      handle = null
    }, delay)
  }

  debounceFn.cancel = function () {
    if (handle) {
      clearTimeout(handle)
      handle = null
    }
  }

  return debounceFn
}
