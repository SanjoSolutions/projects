export function cancelableDebounce(f, delay) {
  let handler

  const fDebounced = () => {
    cancelFDebounced()
    handler = setTimeout(f, delay)
  }

  const cancelFDebounced = () => {
    if (handler) {
      cancelTimeout(handler)
      handler = undefined
    }
  }

  return [fDebounced, cancelFDebounced]
}
