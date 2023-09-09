import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { ScanCommandOutput } from "@aws-sdk/lib-dynamodb"
import type { MoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { createScanCommandForCloseByConnections } from "../database/createScanCommandForCloseByConnections.js"
import { sendMovementToClient } from "./sendMovementToClient.js"

export async function sendMovementToClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  object: MoveFromServerData,
): Promise<void> {
  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  const ddb = createDynamoDBDocumentClient()
  do {
    const connections = (await ddb.send(
      createScanCommandForCloseByConnections(object, lastEvaluatedKey),
    )) as ScanCommandOutput
    const items = connections.Items
    if (items) {
      await Promise.all(
        items.map(({ connectionId }) =>
          sendMovementToClient(apiGwManagementApi, object, connectionId),
        ),
      )
    }

    lastEvaluatedKey = connections.LastEvaluatedKey
  } while (lastEvaluatedKey)
}
