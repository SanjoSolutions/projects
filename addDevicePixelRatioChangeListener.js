export function addDevicePixelRatioChangeListener(callback) {
  let mediaQueryList

  function onDevicePixelRatioChange(event) {
    removeDevicePixelRatioChangeListener()
    addDevicePixelRatioChangeListener(onDevicePixelRatioChange)
    callback(event)
  }

  function addDevicePixelRatioChangeListener() {
    mediaQueryList = matchMedia(`(resolution: ${ window.devicePixelRatio }dppx)`)
    mediaQueryList.addEventListener('change', onDevicePixelRatioChange)
  }

  function removeDevicePixelRatioChangeListener() {
    mediaQueryList.removeEventListener('change', onDevicePixelRatioChange)
  }

  addDevicePixelRatioChangeListener(onDevicePixelRatioChange)

  return removeDevicePixelRatioChangeListener()
}

