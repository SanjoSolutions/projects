import { createFullDocumentCanvas } from "@sanjo/canvas"
import "@sanjo/canvas/createFullDocumentCanvas.css"

export function main(): void {
  const { canvas, context } = createFullDocumentCanvas()

  document.body.appendChild(canvas)

  const a = new A(canvas, context)

  context.fillStyle = "darkblue"
  context.fillRect(0, 0, canvas.width, canvas.height)

  a.drawIsland()
}

class A {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this._canvas = canvas
    this._context = context
  }

  drawIsland(): void {
    this._context.fillStyle = "papayawhip"
    this._context.fillRect(
      0.25 * this._canvas.width,
      0.25 * this._canvas.height,
      0.5 * this._canvas.width,
      0.5 * this._canvas.height,
    )
  }
}
