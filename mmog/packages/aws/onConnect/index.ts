import { PutCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { createDynamoDBDocumentClient } from "../createDynamoDBDocumentClient.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
    }
  }
}

const { CONNECTIONS_TABLE_NAME } = process.env

const ddb = createDynamoDBDocumentClient()

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  await ddb.send(
    new PutCommand({
      TableName: CONNECTIONS_TABLE_NAME,
      Item: {
        id: randomUUID(),
        connectionId: event.requestContext.connectionId,
        type: ObjectType.Character,
        x: 0,
        y: 0,
        isMoving: false,
        direction: Direction.Down,
        whenHasChangedMoving: null,
      },
    }),
  )

  return { statusCode: 200, body: "Connected." }
}
