import {
  type ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import type { ScanCommandOutput } from "@aws-sdk/lib-dynamodb"
import { MessageType } from "../../shared/communication/communication.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { createScanCommandForCloseByConnections } from "../database/createScanCommandForCloseByConnections.js"
import { retrieveConnection } from "../database/retrieveConnection.js"
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
  const response = await retrieveConnection(disconnectedClientConnectionId, [
    "x",
    "y",
  ])

  if (response.Item) {
    const position = {
      x: response.Item.x,
      y: response.Item.y,
    }

    let lastEvaluatedKey: Record<string, any> | undefined = undefined
    do {
      const connections = (await ddb.send(
        createScanCommandForCloseByConnections(position, lastEvaluatedKey),
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
