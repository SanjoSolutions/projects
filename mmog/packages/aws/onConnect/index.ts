import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import { ObjectType } from "../../shared/ObjectType.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
    }
  }
}

const { CONNECTIONS_TABLE_NAME } = process.env

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    apiVersion: "2012-08-10",
    region: process.env.AWS_REGION,
  }),
)

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
      },
    }),
  )

  return { statusCode: 200, body: "Connected." }
}
