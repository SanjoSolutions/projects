import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { decompressMoveDataWithI } from "../../shared/communication/communication.js"
import type { Direction } from "../../shared/Direction.js"
import { updatePosition } from "../../updatePosition.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { retrieveConnection } from "../database/retrieveConnection.js"
import { sendMovementToClient } from "../websocket/sendMovementToClient.js"
import { sendMovementToOtherClients } from "../websocket/sendMovementToOtherClients.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
    }
  }
}

const database = createDynamoDBDocumentClient()

const { CONNECTIONS_TABLE_NAME } = process.env

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  const requestBody = JSON.parse(event.body!)
  const moveData = decompressMoveDataWithI(requestBody.data)
  const whenMovingHasChanged = event.requestContext.requestTimeEpoch

  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })

  const output = await retrieveConnection(event.requestContext.connectionId, [
    "x",
    "y",
    "direction",
    "isMoving",
    "whenMovingHasChanged",
  ])

  if (output.Item) {
    const object = output.Item
    updatePosition(object, whenMovingHasChanged - object.whenMovingHasChanged)
    const x = object.x
    const y = object.y

    const isMoving = Boolean(moveData.isMoving)
    const direction = Number(moveData.direction) as Direction

    const movement = {
      connectionId: event.requestContext.connectionId,
      x,
      y,
      isMoving,
      direction,
      whenMovingHasChanged: whenMovingHasChanged,
      i: Number(moveData.i),
    }

    await Promise.all([
      sendMovementToClient(
        apiGwManagementApi,
        movement,
        event.requestContext.connectionId,
      ),
      // Update database record
      database.send(
        new UpdateCommand({
          TableName: CONNECTIONS_TABLE_NAME,
          Key: { connectionId: event.requestContext.connectionId },
          UpdateExpression:
            "set x = :x, y = :y, isMoving = :isMoving, direction = :direction, whenMovingHasChanged = :whenMovingHasChanged",
          ExpressionAttributeValues: {
            ":x": x,
            ":y": y,
            ":isMoving": isMoving,
            ":direction": direction,
            ":whenMovingHasChanged": whenMovingHasChanged,
          },
        }),
      ),
      sendMovementToOtherClients(
        apiGwManagementApi,
        event.requestContext.connectionId,
        movement,
      ),
    ])
  } else {
    console.log("!output.Item", output)
  }

  return { statusCode: 200 }
}
