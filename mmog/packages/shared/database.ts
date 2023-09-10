import type { Direction } from "./Direction.js"
import type { ID } from "./ID.js"
import type { ObjectType } from "./ObjectType.js"
import type { PlantType } from "./PlantType.js"

export interface Connection {
  id: ID
  connectionId: string
  type: ObjectType.Character
  x: number
  y: number
  isMoving: boolean
  direction: Direction
  whenMovingHasChanged: number
  objectInHand?: ID
}

export interface Object {
  id: ID
  type: ObjectType
  x: number
  y: number
}

export interface Plant extends Object {
  type: ObjectType.Plant
  stage: number
  plantType: PlantType
}
