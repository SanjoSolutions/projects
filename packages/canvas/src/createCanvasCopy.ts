export function createCanvasCopy(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  { x, y, width, height }: { x: number; y: number; width: number; height: number }
): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
  const canvasCopy = document.createElement('canvas')
  canvasCopy.width = width - x
  canvasCopy.height = height - y
  const copyContext = canvasCopy.getContext('2d')!
  copyContext.putImageData(context.getImageData(x, y, width, height), 0, 0)
  return {
    canvas: canvasCopy,
    context: copyContext,
  }
}
