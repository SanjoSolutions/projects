export function clearableDebounce(f, delay) {
  let handler

  const fDebounced = () => {
    cancelFDebounced()
    handler = setTimeout(f, delay)
  }

  const cancelFDebounced = () => {
    if (handler) {
      clearTimeout(handler)
      handler = undefined
    }
  }

  return [fDebounced, cancelFDebounced]
}
