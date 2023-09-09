import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import { HALF_HEIGHT, HALF_WIDTH } from "../maximumSupportedResolution.js"

export function createScanCommandForOtherCloseByConnections(
  position: { x: number; y: number },
  connectionId: string,
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  const input: ScanCommandInput = {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    ProjectionExpression: "connectionId",
    FilterExpression:
      "connectionId <> :connectionId AND x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2",
    ExpressionAttributeValues: {
      ":connectionId": connectionId,
      ":x1": position.x - HALF_WIDTH,
      ":x2": position.x + HALF_WIDTH,
      ":y1": position.y - HALF_HEIGHT,
      ":y2": position.y + HALF_HEIGHT,
    },
  }
  if (exclusiveStartKey) {
    input.ExclusiveStartKey = exclusiveStartKey
  }
  return new ScanCommand(input)
}
