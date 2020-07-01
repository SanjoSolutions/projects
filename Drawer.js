import { matchesSignature } from './matchesSignature.js'
import { polarCoordinatesToCartesianCoordinates } from './polarCoordinatesToCartesianCoordinates.js'

export class Drawer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   */
  constructor (canvas, context) {
    this.canvas = canvas
    this.context = context
  }

  /**
   * @param {{ origin?: any; radius?: any; angle?: any; x?: any; y?: any; }} position
   */
  lineTo (position) {
    const { x, y } = matchesSignature(position, new Set(['origin', 'radius', 'angle'])) ?
      polarCoordinatesToCartesianCoordinates(position) :
      position
    this.context.lineTo(x, y)
    this.context.stroke()
  }
}
