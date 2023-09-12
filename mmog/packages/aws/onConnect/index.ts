import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import type { Connection, Object } from "../../shared/database.js"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import type { APIGatewayProxyWebsocketEventV2WithAuthorizedUser } from "../APIGatewayProxyWebsocketEventV2WithAuthorizedUser.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { retrieveObjectByUserID } from "../database/retrieveObjectByUserID.js"
import { sendMovementToClients } from "../websocket/sendMovementToClients.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
      OBJECTS_TABLE_NAME: string
    }
  }
}

const { CONNECTIONS_TABLE_NAME, OBJECTS_TABLE_NAME } = process.env

const database = createDynamoDBDocumentClient()

export async function handler(
  event: APIGatewayProxyWebsocketEventV2WithAuthorizedUser,
): Promise<APIGatewayProxyResultV2> {
  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })

  const connectionId = event.requestContext.connectionId
  const userID = event.requestContext.authorizer.userId
  const connection: Connection = {
    connectionId,
    userID,
    objectsThatHaveBeenSentToTheClient: [],
    i: 0,
  }
  let objectPart = await retrieveObjectByUserID(userID, [
    "id",
    "x",
    "y",
    "isMoving",
    "direction",
    "whenMovingHasChanged",
  ])
  const promises: Promise<any>[] = []
  let object: Object
  if (objectPart) {
    object = {
      ...objectPart,
      userID,
      type: ObjectType.Character,
      connectionId,
    }
    promises.push(
      database.send(
        new UpdateCommand({
          TableName: OBJECTS_TABLE_NAME,
          Key: {
            id: objectPart.id,
          },
          UpdateExpression: "SET connectionId = :connectionId",
          ExpressionAttributeValues: {
            ":connectionId": connectionId,
          },
        }),
      ),
    )
  } else {
    object = {
      id: randomUUID(),
      userID,
      type: ObjectType.Character,
      x: 0,
      y: 0,
      isMoving: false,
      direction: Direction.Down,
      whenMovingHasChanged: Date.now(),
      connectionId,
    }
    promises.push(
      database.send(
        new PutCommand({
          TableName: OBJECTS_TABLE_NAME,
          Item: object,
        }),
      ),
    )
  }

  await Promise.all([
    ...promises,
    database.send(
      new PutCommand({
        TableName: CONNECTIONS_TABLE_NAME,
        Item: connection,
      }),
    ),
  ])

  await sendMovementToClients(apiGwManagementApi, {
    ...object,
    userID: object.userID!,
    i: connection.i,
  })

  return { statusCode: 200 }
}
