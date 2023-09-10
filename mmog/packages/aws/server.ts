import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import type { ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import type { Connection } from "../shared/database.js"
import type { ID } from "../shared/ID.js"
import { scanThroughAll } from "./database/scanThroughAll.js"
import { HALF_HEIGHT, HALF_WIDTH } from "./maximumSupportedResolution.js"
import { sendMovementToClient } from "./websocket/sendMovementToClient.js"

// Environment variables required:
// * API_GATEWAY_URL

const TICK_RATE = 30 // ticks per second
const MAXIMUM_NUMBER_OF_ITEMS_THAT_CAN_BE_IN_IN_EXPRESSION = 100

while (true) {
  let lastRun = Date.now()
  await scanThroughAll(
    createScanCommandInputForAllConnections,
    async (output) => {
      const items = output.Items
      if (items) {
        await Promise.all(
          items.map((connection) =>
            sendObjectsToTheClient(
              connection as Pick<
                Connection,
                | "id"
                | "connectionId"
                | "objectsThatHaveBeenSentToTheClient"
                | "x"
                | "y"
              >,
            ),
          ),
        )
      }
    },
  )
  const durationToWait = Math.max(1000 / TICK_RATE - (Date.now() - lastRun), 0)
  if (durationToWait > 0) {
    await wait(durationToWait)
  }
}

async function wait(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function sendObjectsToTheClient(
  connection: Pick<
    Connection,
    "id" | "connectionId" | "objectsThatHaveBeenSentToTheClient" | "x" | "y"
  >,
) {
  const first100ObjectsThatHaveBeenSentToTheClient =
    connection.objectsThatHaveBeenSentToTheClient
      ? connection.objectsThatHaveBeenSentToTheClient.slice(
          0,
          MAXIMUM_NUMBER_OF_ITEMS_THAT_CAN_BE_IN_IN_EXPRESSION,
        )
      : []
  const remainingObjectsThatHaveBeenSentToTheClient = new Set(
    connection.objectsThatHaveBeenSentToTheClient
      ? connection.objectsThatHaveBeenSentToTheClient.slice(
          MAXIMUM_NUMBER_OF_ITEMS_THAT_CAN_BE_IN_IN_EXPRESSION,
        )
      : [],
  )
  await scanThroughAll(
    () =>
      createScanCommandInputForConnectionsToSendToClient(
        connection,
        first100ObjectsThatHaveBeenSentToTheClient,
      ),
    async (output) => {
      const objects = output.Items as Pick<
        Connection,
        | "id"
        | "connectionId"
        | "x"
        | "y"
        | "direction"
        | "isMoving"
        | "whenMovingHasChanged"
        | "i"
      >[]
      if (objects) {
        const objectsToSendToTheClient = objects.filter((object) => {
          return !remainingObjectsThatHaveBeenSentToTheClient.has(object.id)
        })
        await sendObjectsToTheClient2(
          objectsToSendToTheClient,
          connection.connectionId,
        )
      }
    },
  )
}

async function sendObjectsToTheClient2(
  objectsToSendToTheClient: Pick<
    Connection,
    | "id"
    | "connectionId"
    | "x"
    | "y"
    | "direction"
    | "isMoving"
    | "whenMovingHasChanged"
    | "i"
  >[],
  connectionId: string,
): Promise<void> {
  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: process.env.API_GATEWAY_URL,
  })
  await Promise.all(
    objectsToSendToTheClient.map((object) =>
      sendMovementToClient(apiGwManagementApi, object, connectionId),
    ),
  )
}

function createScanCommandInputForAllConnections(): ScanCommandInput {
  return {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    ProjectionExpression:
      "id, connectionId, objectsThatHaveBeenSentToTheClient, x, y",
  }
}

function createScanCommandInputForConnectionsToSendToClient(
  connection: Pick<Connection, "id" | "x" | "y">,
  objectsThatHaveBeenSentToTheClient: ID[],
): ScanCommandInput {
  return {
    TableName: process.env.CONNECTIONS_TABLE_NAME,
    ProjectionExpression:
      "id, connectionId, x, y, direction, isMoving, whenMovingHasChanged, i",
    FilterExpression:
      "id <> :id AND x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2 AND NOT id IN (:ids)",
    ExpressionAttributeValues: {
      ":id": connection.id,
      ":x1": connection.x - HALF_WIDTH,
      ":x2": connection.x + HALF_WIDTH,
      ":y1": connection.y - HALF_HEIGHT,
      ":y2": connection.y + HALF_HEIGHT,
      ":ids": objectsThatHaveBeenSentToTheClient,
    },
  }
}
