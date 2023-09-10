import type { ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import { HALF_HEIGHT, HALF_WIDTH } from "../maximumSupportedResolution.js"

export function createScanCommandInputForCloseByConnections(position: {
  x: number
  y: number
}): ScanCommandInput {
  return {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    ProjectionExpression: "connectionId",
    FilterExpression: "x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2",
    ExpressionAttributeValues: {
      ":x1": position.x - HALF_WIDTH,
      ":x2": position.x + HALF_WIDTH,
      ":y1": position.y - HALF_HEIGHT,
      ":y2": position.y + HALF_HEIGHT,
    },
  }
}
