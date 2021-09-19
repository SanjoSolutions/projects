import { noop } from "./noop.js";
import { listenToDevicePixelRatioChange } from "./listenToDevicePixelRatioChange.js";

/**
 * @usage
 * @see createFullDocumentCanvas.css
 */
export function createFullDocumentCanvas(
  onDevicePixelRatioOrDocumentSizeChangeFn = noop
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  setCanvasSizeAndScale();

  listenToDevicePixelRatioChange(onDevicePixelRatioOrDocumentSizeChange);
  window.addEventListener("resize", onDevicePixelRatioOrDocumentSizeChange);

  function setCanvasSizeAndScale() {
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio;
    canvas.width = devicePixelRatio * documentWidth;
    canvas.height = devicePixelRatio * documentHeight;
    context.resetTransform();
    context.scale(devicePixelRatio, devicePixelRatio);
  }

  function onDevicePixelRatioOrDocumentSizeChange(event) {
    setCanvasSizeAndScale();
    onDevicePixelRatioOrDocumentSizeChangeFn(event);
  }

  return { canvas, context };
}
