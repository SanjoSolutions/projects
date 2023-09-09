import { Buffer } from "buffer"
import type { Direction } from "./Direction.js"
import { MoveDataWithI as MoveDataWithIProto } from "./MoveDataWithI.js"
import { MoveFromServerData as MoveFromServerDataProto } from "./MoveFromServerData.js"

export interface MoveData {
  isMoving: boolean
  direction: Direction
}

export type MoveDataWithI = MoveData & { i: number }

export interface Package {
  type: MessageType
  data: any
}

export enum MessageType {
  Move = "move",
  Objects = "objects",
  RequestObjects = "request-objects",
  InitializeWorld = "initialize-world",
  OtherClientDisconnected = "other-client-disconnected",
}

export type CompressedMoveData = string

function compress(klass: any, data: any): string {
  return Buffer.from(klass.fromObject(data).serialize()).toString("base64")
}

function decompress(klass: any, data: string): any {
  return klass
    .deserializeBinary(new Uint8Array(Buffer.from(data, "base64")))
    .toObject()
}

export function compressMoveDataWithI(data: MoveDataWithI): CompressedMoveData {
  return compress(MoveDataWithIProto, data)
}

export function decompressMoveDataWithI(
  data: CompressedMoveData,
): MoveDataWithI {
  return decompress(MoveDataWithIProto, data) as MoveDataWithI
}

export interface MoveFromServerData {
  connectionId: string
  isMoving: boolean
  direction: Direction
  x: number
  y: number
  i: number
  isCharacterOfClient?: boolean
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
