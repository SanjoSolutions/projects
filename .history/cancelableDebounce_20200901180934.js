export function clearableDebounce(f, delay) {
  let handler

  const fDebounced = () => {
    clearFDebounced()
    handler = setTimeout(f, delay)
  }

  const clearFDebounced = () => {
    clearTimeout(handler)
    handler = undefined
  }

  return [fDebounced, clearFDebounced]
}
