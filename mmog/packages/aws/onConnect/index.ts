import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import type { Connection } from "../../shared/database.js"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { sendMovementToClients } from "../websocket/sendMovementToClients.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
    }
  }
}

const { CONNECTIONS_TABLE_NAME } = process.env

const database = createDynamoDBDocumentClient()

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })
  const character: Connection = {
    id: randomUUID(),
    connectionId: event.requestContext.connectionId,
    type: ObjectType.Character,
    x: 0,
    y: 0,
    isMoving: false,
    direction: Direction.Down,
    whenMovingHasChanged: Date.now(),
  }
  await sendMovementToClients(apiGwManagementApi, { ...character, i: 0 })

  await database.send(
    new PutCommand({
      TableName: CONNECTIONS_TABLE_NAME,
      Item: character,
    }),
  )

  return { statusCode: 200, body: "Connected." }
}
