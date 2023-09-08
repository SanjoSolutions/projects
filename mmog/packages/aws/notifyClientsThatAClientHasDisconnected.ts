import {
  type ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { GetCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb"
import { MessageType } from "../shared/communication.js"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"
import { createScanCommand } from "./createScanCommand.js"
import { postToConnection } from "./postToConnection.js"

export async function notifyClientsThatAClientHasDisconnected(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  disconnectedClientConnectionId: string,
): Promise<void> {
  const postData = JSON.stringify({
    type: MessageType.OtherClientDisconnected,
    data: {
      connectionId: disconnectedClientConnectionId,
    },
  })

  const ddb = createDynamoDBDocumentClient()
  const response = await ddb.send(
    new GetCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId: disconnectedClientConnectionId,
      },
      ProjectionExpression: "x, y",
    }),
  )

  if (response.Item) {
    const position = {
      x: response.Item.x,
      y: response.Item.y,
    }

    let lastEvaluatedKey: Record<string, any> | undefined = undefined
    do {
      const connections = (await ddb.send(
        createScanCommand(position, lastEvaluatedKey),
      )) as ScanCommandOutput
      const items = connections.Items
      if (items) {
        await Promise.all(
          items.map(async ({ connectionId }) => {
            if (connectionId !== disconnectedClientConnectionId) {
              await postToConnection(
                apiGwManagementApi,
                new PostToConnectionCommand({
                  ConnectionId: connectionId,
                  Data: postData,
                }),
              )
            }
          }),
        )
      }

      lastEvaluatedKey = connections.LastEvaluatedKey
    } while (lastEvaluatedKey)
  }
}
