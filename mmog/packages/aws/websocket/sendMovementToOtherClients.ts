import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { ScanCommandOutput } from "@aws-sdk/lib-dynamodb"
import type { MoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { createScanCommandForOtherCloseByConnections } from "../database/createScanCommandForOtherCloseByConnections.js"
import { sendMovementToClient } from "./sendMovementToClient.js"

export async function sendMovementToOtherClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  connectionId: string,
  object: MoveFromServerData,
): Promise<void> {
  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  const ddb = createDynamoDBDocumentClient()
  do {
    const connections = (await ddb.send(
      createScanCommandForOtherCloseByConnections(
        object,
        connectionId,
        lastEvaluatedKey,
      ),
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
