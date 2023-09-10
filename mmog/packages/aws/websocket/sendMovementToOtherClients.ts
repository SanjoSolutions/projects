import type { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { MoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { createScanCommandInputForOtherCloseByConnections } from "../database/createScanCommandInputForOtherCloseByConnections.js"
import { scanThroughAll } from "../database/scanThroughAll.js"
import { sendMovementToClient } from "./sendMovementToClient.js"

export async function sendMovementToOtherClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  connectionId: string,
  object: MoveFromServerData,
): Promise<void> {
  await scanThroughAll(
    () =>
      createScanCommandInputForOtherCloseByConnections(object, connectionId),
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
