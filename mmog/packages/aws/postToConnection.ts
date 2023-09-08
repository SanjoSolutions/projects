import type {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { removeStaleConnection } from "./removeStaleConnection.js"

export async function postToConnection(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  command: PostToConnectionCommand,
): Promise<void> {
  try {
    await apiGwManagementApi.send(command)
  } catch (error: any) {
    if (error.statusCode === 410) {
      removeStaleConnection(apiGwManagementApi, command.input.ConnectionId!)
    } else {
      console.error(error)
    }
  }
}
