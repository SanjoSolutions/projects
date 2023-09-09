import type { Direction } from "./Direction.js"
import type { ObjectType } from "./ObjectType.js"

export interface Connection {
  id: string
  connectionId: string
  type: ObjectType.Character
  x: number
  y: number
  isMoving: boolean
  direction: Direction
  whenMovingHasChanged: number
}

export interface Object {
  id: string
  type: ObjectType
  x: number
  y: number
}
