export function throttle(fn, interval) {
  let handle = null

  function throttleFn(...args) {
    let hasBeenCalled = false
    let calledWithArgs = []
    if (handle) {
      hasBeenCalled = true
      calledWithArgs = args
    } else {
      fn(...args)
      handle = setTimeout(() => {
        handle = null
        if (hasBeenCalled) {
          hasBeenCalled = false
          fn(...calledWithArgs)
          calledWithArgs = []
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
