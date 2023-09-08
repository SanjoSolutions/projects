import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"
import { notifyClientsThatAClientHasDisconnected } from "./notifyClientsThatAClientHasDisconnected.js"

export async function removeStaleConnection(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  connectionId: string,
): Promise<void> {
  console.log(`Found stale connection, deleting ${connectionId}`)
  await notifyClientsThatAClientHasDisconnected(
    apiGwManagementApi,
    connectionId,
  )
  const ddb = createDynamoDBDocumentClient()
  await ddb.send(
    new DeleteCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: { connectionId },
    }),
  )
}
