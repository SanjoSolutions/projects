export function render(fn) {
  let shouldStop = false

  async function onFrame(time) {
    if (!shouldStop) {
      await fn(time)
      requestNextAnimationFrame()
    }
  }

  function requestNextAnimationFrame() {
    requestAnimationFrame(onFrame)
  }

  function stop() {
    shouldStop = true
  }

  requestNextAnimationFrame()

  return { stop }
}
