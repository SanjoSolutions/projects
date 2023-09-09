// https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-route-keys-connect-disconnect.html
// The $disconnect route is executed after the connection is closed.
// The connection can be closed by the server or by the client. As the connection is already closed when it is executed,
// $disconnect is a best-effort event.
// API Gateway will try its best to deliver the $disconnect event to your integration, but it cannot guarantee delivery.

import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { notifyClientsThatAClientHasDisconnected } from "../websocket/notifyClientsThatAClientHasDisconnected.js"

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

  await notifyClientsThatAClientHasDisconnected(
    apiGwManagementApi,
    event.requestContext.connectionId,
  )

  await database.send(
    new DeleteCommand({
      TableName: CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId: event.requestContext.connectionId,
      },
    }),
  )

  return { statusCode: 200 }
}
