import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import {
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import {
  compressMoveFromServerData,
  decompressMoveDataWithI,
  MessageType,
} from "../../shared/communication.js"
import { createDynamoDBDocumentClient } from "../createDynamoDBDocumentClient.js"
import { postToConnection } from "../postToConnection.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
    }
  }
}

const ddb = createDynamoDBDocumentClient()

const { CONNECTIONS_TABLE_NAME } = process.env

const MAXIMUM_SUPPORTED_RESOLUTION = {
  width: 2560,
  height: 1440,
}

const HALF_WIDTH = Math.ceil(MAXIMUM_SUPPORTED_RESOLUTION.width / 2)
const HALF_HEIGHT = Math.ceil(MAXIMUM_SUPPORTED_RESOLUTION.height / 2)

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  const requestBody = JSON.parse(event.body!)
  const moveData = decompressMoveDataWithI(requestBody.data)

  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })

  const postData = JSON.stringify({
    type: MessageType.Move,
    data: compressMoveFromServerData({
      connectionId: event.requestContext.connectionId!,
      i: Number(moveData.i),
      isMoving: Boolean(moveData.isMoving),
      x: Number(moveData.x),
      y: Number(moveData.y),
      direction: Number(moveData.direction),
    }),
  })

  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const connections = (await ddb.send(
      createScanCommand(moveData, lastEvaluatedKey),
    )) as ScanCommandOutput
    const items = connections.Items
    if (items) {
      await Promise.all(
        items.map(async ({ connectionId }) => {
          if (connectionId !== event.requestContext.connectionId) {
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

    lastEvaluatedKey = connections.LastEvaluatedKey
  } while (lastEvaluatedKey)

  await ddb.send(
    new UpdateCommand({
      TableName: CONNECTIONS_TABLE_NAME,
      Key: { connectionId: event.requestContext.connectionId },
      UpdateExpression:
        "set x = :x, y = :y, direction = :direction, isMoving = :isMoving",
      ExpressionAttributeValues: {
        ":x": moveData.x,
        ":y": moveData.y,
        ":direction": moveData.direction,
        ":isMoving": moveData.isMoving,
      },
    }),
  )

  return { statusCode: 200, body: "Data sent." }
}

function createScanCommand(
  position: { x: number; y: number },
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  const input: ScanCommandInput = {
    TableName: CONNECTIONS_TABLE_NAME,
    ProjectionExpression: "connectionId",
    FilterExpression: "x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2",
    ExpressionAttributeValues: {
      ":x1": position.x - HALF_WIDTH,
      ":x2": position.x + HALF_WIDTH,
      ":y1": position.y - HALF_HEIGHT,
      ":y2": position.y + HALF_HEIGHT,
    },
  }
  if (exclusiveStartKey) {
    input.ExclusiveStartKey = exclusiveStartKey
  }
  return new ScanCommand(input)
}
