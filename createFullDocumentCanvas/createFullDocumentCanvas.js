import { listenToDevicePixelRatioChange } from '../listenToDevicePixelRatioChange.js'
import { noop } from '../noop.js'
import { throttle } from '../throttle.js'

/**
 * @usage
 * @see createFullDocumentCanvas.css
 */
export function createFullDocumentCanvas(
  onDevicePixelRatioOrDocumentSizeChangeFn = noop,
) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const documentWidth = window.innerWidth
  const documentHeight = window.innerHeight
  const devicePixelRatio = window.devicePixelRatio
  canvas.style.width = `${ documentWidth }px`
  canvas.style.height = `${ documentHeight }px`
  canvas.width = devicePixelRatio * documentWidth
  canvas.height = devicePixelRatio * documentHeight
  context.scale(devicePixelRatio, devicePixelRatio)

  const setCanvasSizeAndScale = throttle(
    function setCanvasSizeAndScale() {
      const oldWidth = parseInt(canvas.style.width, 10)
      const newWidth = window.innerWidth
      const oldHeight = parseInt(canvas.style.height, 10)
      const newHeight = window.innerHeight

      const devicePixelRatio = window.devicePixelRatio

      if (newWidth > oldWidth || newHeight > oldHeight) {
        const copyCanvas = document.createElement('canvas')
        copyCanvas.width = canvas.width
        copyCanvas.height = canvas.height
        const copyContext = copyCanvas.getContext('2d')
        copyContext.putImageData(
          context.getImageData(0, 0, canvas.width, canvas.height),
          0,
          0,
        )

        if (newWidth > oldWidth) {
          canvas.style.width = `${ newWidth }px`
          canvas.width = devicePixelRatio * newWidth
        }

        if (newHeight > oldHeight) {
          canvas.style.height = `${ newHeight }px`
          canvas.height = devicePixelRatio * newHeight
        }

        context.resetTransform()
        context.scale(devicePixelRatio, devicePixelRatio)
        context.putImageData(
          copyContext.getImageData(0, 0, copyCanvas.width, copyCanvas.height),
          0,
          0,
        )
        copyCanvas.remove()
      }
    },
    200,
  )

  listenToDevicePixelRatioChange(onDevicePixelRatioOrDocumentSizeChange)
  window.addEventListener('resize', onDevicePixelRatioOrDocumentSizeChange)

  function onDevicePixelRatioOrDocumentSizeChange(event) {
    setCanvasSizeAndScale()
    onDevicePixelRatioOrDocumentSizeChangeFn(event)
  }

  return { canvas, context }
}
