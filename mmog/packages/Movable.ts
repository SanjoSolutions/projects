import { Direction } from "./shared/Direction.js"

export interface Movable {
  x: number
  y: number
  isMoving: boolean
  direction: Direction
}
