import {
  type ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { MessageType } from "../../shared/communication/communication.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { createScanCommandInputForCloseByConnections } from "../database/createScanCommandInputForCloseByConnections.js"
import { retrieveConnection } from "../database/retrieveConnection.js"
import { scanThroughAll } from "../database/scanThroughAll.js"
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

    await scanThroughAll(
      () => createScanCommandInputForCloseByConnections(position),
      async (output) => {
        const items = output.Items
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
      },
    )
  }
}
