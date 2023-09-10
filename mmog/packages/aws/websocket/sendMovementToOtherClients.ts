import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { MoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { createScanCommandForOtherCloseByConnections } from "../database/createScanCommandForOtherCloseByConnections.js"
import { scanThroughAll } from "../database/scanThroughAll.js"
import { sendMovementToClient } from "./sendMovementToClient.js"

export async function sendMovementToOtherClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  connectionId: string,
  object: MoveFromServerData,
): Promise<void> {
  await scanThroughAll(
    (lastEvaluatedKey) =>
      createScanCommandForOtherCloseByConnections(
        object,
        connectionId,
        lastEvaluatedKey,
      ),
    async (output) => {
      const items = output.Items
      if (items) {
        await Promise.all(
          items.map(({ connectionId }) =>
            sendMovementToClient(apiGwManagementApi, object, connectionId),
          ),
        )
      }
    },
  )
}
