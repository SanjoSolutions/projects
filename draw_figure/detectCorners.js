import { unique } from '../unique.js'
import { detectCorner } from './detectCorner.js'

export function detectCorners (points) {
  points = [points[points.length - 1]].concat(points, [points[0]])
  let cornerPoints = []
  for (let index = 0; index < points.length - 2; index++) {
    const a = points[index]
    const c = points[index + 1]
    const b = points[index + 2]
    if (detectCorner([a, c, b])) {
      cornerPoints.push(c)
    }
  }
  cornerPoints = unique(cornerPoints)
  return cornerPoints
}
