import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { MoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { createScanCommandInputForCloseByConnections } from "../database/createScanCommandInputForCloseByConnections.js"
import { scanThroughAll } from "../database/scanThroughAll.js"
import { sendMovementToClient } from "./sendMovementToClient.js"

export async function sendMovementToClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  object: MoveFromServerData,
): Promise<void> {
  await scanThroughAll(
    () => createScanCommandInputForCloseByConnections(object),
    async (output) => {
      const items = output.Items
      if (items) {
        await Promise.all(
          items.map(({ connectionId, userID }) =>
            sendMovementToClient(
              apiGwManagementApi,
              object,
              connectionId,
              userID,
            ),
          ),
        )
      }
    },
  )
}
