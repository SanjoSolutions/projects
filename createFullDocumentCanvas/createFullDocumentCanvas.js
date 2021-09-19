import { addDevicePixelRatioChangeListener } from '../addDevicePixelRatioChangeListener.js'
import { createCanvasCopy } from '../createCanvasCopy.js'
import { noop } from '../noop.js'
import { throttle } from '../throttle.js'

/**
 * @see createFullDocumentCanvas.css
 */
export function createFullDocumentCanvas(
  {
    onDevicePixelRatioOrDocumentSizeChange,
    afterCanvasSizeAndScaleSet,
  } = {},
) {
  if (!onDevicePixelRatioOrDocumentSizeChange) {
    onDevicePixelRatioOrDocumentSizeChange = noop
  }

  if (!afterCanvasSizeAndScaleSet) {
    afterCanvasSizeAndScaleSet = noop
  }

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
        const { canvas: canvasCopy, context: copyContext } = createCanvasCopy(
          canvas,
          context,
          {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
          },
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
          copyContext.getImageData(0, 0, canvasCopy.width, canvasCopy.height),
          0,
          0,
        )
      }

      afterCanvasSizeAndScaleSet()
    },
    200,
  )

  const removeDevicePixelRatioChangeListener = addDevicePixelRatioChangeListener(
    _onDevicePixelRatioOrDocumentSizeChange,
  )
  window.addEventListener('resize', _onDevicePixelRatioOrDocumentSizeChange)

  function _onDevicePixelRatioOrDocumentSizeChange(event) {
    setCanvasSizeAndScale()
    onDevicePixelRatioOrDocumentSizeChange(event)
  }

  function removeEventListeners() {
    setCanvasSizeAndScale.cancel()
    removeDevicePixelRatioChangeListener()
    window.removeEventListener('resize', _onDevicePixelRatioOrDocumentSizeChange)
  }

  return { canvas, context, removeEventListeners }
}
