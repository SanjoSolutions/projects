export function cancelableDebounce(f, delay) {
  let handler

  const fDebounced = () => {
    cancelFDebounced()
    handler = setTimeout(f, delay)
  }

  const cancelFDebounced = () => {
    clearTimeout(handler)
    handler = undefined
  }

  return [fDebounced, cancelFDebounced]
}
