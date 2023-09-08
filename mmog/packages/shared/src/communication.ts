export enum Direction {
  None = 0b0,
  Left = 0b1,
  Right = 0b10,
  Up = 0b100,
  Down = 0b1000,
}

function compressBoolean(value: boolean): number {
  return value ? 1 : 0
}

function decompressBoolean(value: number): boolean {
  return value === 1
}

export interface MoveData {
  isMoving: boolean
  direction: Direction
  x: number
  y: number
}

export type MoveDataWithI = MoveData & { i: number }

export type CompressedMoveData = [number, number, Direction, number, number]

export interface Package {
  action: MessageType
  data: any
}

export type CompressedPackage = [MessageType, any]

export enum MessageType {
  Move = "move",
  Characters = "characters",
  RequestCharacters = "request-characters",
}

export function decompressPackage(
  compressedPackage: CompressedPackage,
): Package {
  const [action, data] = compressedPackage
  return {
    action,
    data,
  }
}

export function compressMoveData(data: MoveDataWithI): CompressedMoveData {
  const { i, isMoving, x, y, direction } = data
  return [i, compressBoolean(isMoving), direction, x, y]
}

export function decompressMoveData(data: CompressedMoveData): MoveDataWithI {
  const [i, isMoving, direction, x, y] = data
  return {
    i,
    isMoving: decompressBoolean(isMoving),
    direction,
    x,
    y,
  }
}

export type MoveFromServerData = { connectionId: string } & MoveDataWithI

export type CompressedMoveFromServerData = [
  string,
  number,
  number,
  Direction,
  number,
  number,
]

export function compressMoveFromServerData(
  data: MoveFromServerData,
): CompressedMoveFromServerData {
  const { connectionId } = data
  return [connectionId, ...compressMoveData(data)]
}

export function decompressMoveFromServerData(
  data: CompressedMoveFromServerData,
): MoveFromServerData {
  const [connectionId, i, isMoving, direction, x, y] = data
  return {
    connectionId,
    i,
    isMoving: decompressBoolean(isMoving),
    direction,
    x,
    y,
  }
}
