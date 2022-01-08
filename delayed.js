export function delayed(fn, delay) {
  let handler = null

  function delayedFn(...args) {
    if (!handler) {
      handler = setTimeout(() => {
        handler = null
        fn(...args)
      }, delay)
    }
  }

  delayedFn.cancel = function () {
    if (handler) {
      clearTimeout(handler)
      handler = null
    }
  }

  return delayedFn
}
