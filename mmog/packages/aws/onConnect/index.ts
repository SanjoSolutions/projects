import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2WithRequestContext,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import type { Connection, Object } from "../../shared/database.js"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
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
  event: APIGatewayProxyWebsocketEventV2WithRequestContext<
    APIGatewayEventWebsocketRequestContextV2 & {
      authorizer: { userId: string }
    }
  >,
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
  const object: Object = {
    id: randomUUID(),
    type: ObjectType.Character,
    x: 0,
    y: 0,
    isMoving: false,
    direction: Direction.Down,
    whenMovingHasChanged: Date.now(),
  }
  const dataPackage = {
    ...connection,
    ...object,
  }
  await Promise.all([
    sendMovementToClients(apiGwManagementApi, dataPackage),
    database.send(
      new PutCommand({
        TableName: CONNECTIONS_TABLE_NAME,
        Item: connection,
      }),
    ),
    database.send(
      new PutCommand({
        TableName: OBJECTS_TABLE_NAME,
        Item: object,
      }),
    ),
  ])

  return { statusCode: 200 }
}
