export function listenToDevicePixelRatioChange(callback) {
  let mediaQueryList;

  function registerDevicePixelRatioChangeListener(onDevicePixelRatioChange) {
    mediaQueryList = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    mediaQueryList.addEventListener("change", onDevicePixelRatioChange);
  }

  function onDevicePixelRatioChange(event) {
    mediaQueryList.removeEventListener("change", onDevicePixelRatioChange);
    registerDevicePixelRatioChangeListener(onDevicePixelRatioChange);
    callback(event);
  }

  registerDevicePixelRatioChangeListener(onDevicePixelRatioChange);
}
