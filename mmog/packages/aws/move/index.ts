import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy.js"
import { decompressMoveDataWithI } from "../../shared/communication/communication.js"
import type { Direction } from "../../shared/Direction.js"
import { updatePosition } from "../../updatePosition.js"
import type { APIGatewayProxyWebsocketEventV2WithAuthorizedUser } from "../APIGatewayProxyWebsocketEventV2WithAuthorizedUser.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { retrieveObjectByUserID } from "../database/retrieveObjectByUserID.js"
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

const { OBJECTS_TABLE_NAME } = process.env

export async function handler(
  event: APIGatewayProxyWebsocketEventV2WithAuthorizedUser,
): Promise<APIGatewayProxyResultV2> {
  const userID = event.requestContext.authorizer.userId
  const requestBody = JSON.parse(event.body!)
  const moveData = decompressMoveDataWithI(requestBody.data)
  const whenMovingHasChanged = event.requestContext.requestTimeEpoch

  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })

  const object = await retrieveObjectByUserID(userID, [
    "id",
    "x",
    "y",
    "direction",
    "isMoving",
    "whenMovingHasChanged",
  ])

  if (object) {
    updatePosition(object, whenMovingHasChanged - object.whenMovingHasChanged)
    const x = object.x
    const y = object.y

    const isMoving = Boolean(moveData.isMoving)
    const direction = Number(moveData.direction) as Direction

    const movement = {
      id: object.id,
      userID,
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
        userID,
      ),
      // Update database record
      database.send(
        new UpdateCommand({
          TableName: OBJECTS_TABLE_NAME,
          Key: { id: object.id },
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
        userID,
        movement,
      ),
    ])
  }

  return { statusCode: 200 }
}
