import type { Direction } from "./Direction.js"
import type { ID } from "./ID.js"
import type { ObjectType } from "./ObjectType.js"
import type { PlantType } from "./PlantType.js"

export interface Connection {
  connectionId: string
  userID: string
  objectsThatHaveBeenSentToTheClient?: ID[]
  i: number
}

export interface Object {
  id: ID
  type: ObjectType
  x: number
  y: number
  isMoving: boolean
  direction: Direction
  whenMovingHasChanged: number
}

export interface Plant extends Object {
  type: ObjectType.Plant
  stage: number
  plantType: PlantType
}
