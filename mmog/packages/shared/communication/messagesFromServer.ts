import type { Direction } from "../Direction.js"
import { MoveFromServerData as MoveFromServerDataProto } from "../MoveFromServerData.js"
import { compress, decompress } from "./communication.js"

export interface MoveFromServerData {
  connectionId: string
  isMoving: boolean
  direction: Direction
  x: number
  y: number
  i: number
  isCharacterOfClient?: boolean
  whenMovingHasChanged: number
}

export type CompressedMoveFromServerData = string

export function compressMoveFromServerData(
  data: MoveFromServerData,
): CompressedMoveFromServerData {
  return compress(MoveFromServerDataProto, data)
}

export function decompressMoveFromServerData(
  data: CompressedMoveFromServerData,
): MoveFromServerData {
  return decompress(MoveFromServerDataProto, data) as MoveFromServerData
}
