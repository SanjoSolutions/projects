import type {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { removeStaleConnection } from "../removeStaleConnection.js"

export async function postToConnection(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  command: PostToConnectionCommand,
): Promise<void> {
  try {
    await apiGwManagementApi.send(command)
  } catch (error: any) {
    console.log("error", error, JSON.stringify(error))
    if (error.$metadata?.httpStatusCode === 410) {
      await removeStaleConnection(
        apiGwManagementApi,
        command.input.ConnectionId!,
      )
    } else {
      console.error(error)
    }
  }
}
