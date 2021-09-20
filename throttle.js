export function throttle(fn, interval) {
  let handle = null

  function throttleFn(...args) {
    let hasBeenCalled = false
    if (handle) {
      hasBeenCalled = true
    } else {
      fn()
      handle = setTimeout(() => {
        handle = null
        if (hasBeenCalled) {
          fn()
        }
      }, interval)
    }
  }

  throttleFn.cancel = function () {
    if (handle) {
      clearTimeout(handle)
      handle = null
    }
  }

  return throttleFn
}
