import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"
import { createDynamoDBDocumentClient } from "./database/createDynamoDBDocumentClient.js"
import { notifyClientsThatAClientHasDisconnected } from "./websocket/notifyClientsThatAClientHasDisconnected.js"

export async function removeStaleConnection(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  connectionId: string,
): Promise<void> {
  console.log(`Found stale connection, deleting ${connectionId}`)
  const database = createDynamoDBDocumentClient()
  await database.send(
    new DeleteCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: { connectionId },
    }),
  )
  await notifyClientsThatAClientHasDisconnected(
    apiGwManagementApi,
    connectionId,
  )
}
