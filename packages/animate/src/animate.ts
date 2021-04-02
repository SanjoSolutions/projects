export function animate(fn: Function): { stop: () => void } {
  let lastFrameTime: number;
  let shouldStop = false;

  function stop() {
    shouldStop = true;
  }

  function onFrame() {
    if (!shouldStop) {
      const currentFrameTime = Date.now();
      const elapsedTime =
        currentFrameTime - (lastFrameTime || currentFrameTime);
      fn(elapsedTime);
      lastFrameTime = currentFrameTime;
      requestNextAnimationFrame();
    }
  }

  function requestNextAnimationFrame() {
    requestAnimationFrame(onFrame);
  }

  requestNextAnimationFrame();

  return { stop };
}
