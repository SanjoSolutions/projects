import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import {
  ScanCommand,
  ScanCommandOutput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"
import type { ScheduledEvent } from "aws-lambda/trigger/cloudwatch-events.js"
import { MessageType } from "../../shared/communication/communication.js"
import type { Plant } from "../../shared/database.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"
import { createScanCommandForCloseByConnections } from "../database/createScanCommandForCloseByConnections.js"
import { postToConnection } from "../websocket/postToConnection.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OBJECTS_TABLE_NAME: string
    }
  }
}

const { OBJECTS_TABLE_NAME, API_GATEWAY_URL } = process.env

const database = createDynamoDBDocumentClient()
const apiGwManagementApi = new ApiGatewayManagementApiClient({
  apiVersion: "2018-11-29",
  endpoint: API_GATEWAY_URL,
})

export async function handler(event: ScheduledEvent): Promise<void> {
  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const plantsToUpdate = await database.send(
      new ScanCommand({
        TableName: process.env.OBJECTS_TABLE_NAME,
        ProjectionExpression: "id, stage, x, y",
        FilterExpression: "#type = :type AND stage < :maxGrowStage",
        ExpressionAttributeValues: {
          ":type": ObjectType.Plant,
          ":maxGrowStage": 3,
        },
        ExpressionAttributeNames: {
          "#type": "type",
        },
      }),
    )
    const items = plantsToUpdate.Items
    if (items) {
      await Promise.all(
        items.map(async ({ id, stage, x, y }) => {
          await database.send(
            new UpdateCommand({
              Key: { id },
              TableName: OBJECTS_TABLE_NAME,
              UpdateExpression: "SET stage = stage + :increment",
              ExpressionAttributeValues: {
                ":increment": 1,
              },
            }),
          )
          await sendPlantHasGrownToClients(apiGwManagementApi, {
            id,
            stage: stage + 1,
            x,
            y,
          })
        }),
      )
    }

    lastEvaluatedKey = plantsToUpdate.LastEvaluatedKey
  } while (lastEvaluatedKey)
}

async function sendPlantHasGrownToClients(
  apiGwManagementApi: ApiGatewayManagementApiClient,
  plant: Pick<Plant, "id" | "stage" | "x" | "y">,
): Promise<void> {
  const postData = JSON.stringify({
    type: MessageType.PlantHasGrown,
    data: {
      id: plant.id,
      stage: plant.stage,
    },
  })

  const database = createDynamoDBDocumentClient()
  const position = {
    x: plant.x,
    y: plant.y,
  }

  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const connections = (await database.send(
      createScanCommandForCloseByConnections(position, lastEvaluatedKey),
    )) as ScanCommandOutput
    const items = connections.Items
    if (items) {
      await Promise.all(
        items.map(async ({ connectionId }) => {
          await postToConnection(
            apiGwManagementApi,
            new PostToConnectionCommand({
              ConnectionId: connectionId,
              Data: postData,
            }),
          )
        }),
      )
    }

    lastEvaluatedKey = connections.LastEvaluatedKey
  } while (lastEvaluatedKey)
}