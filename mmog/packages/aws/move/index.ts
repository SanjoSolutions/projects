import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import {
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import type { Movable } from "../../Movable.js"
import {
  compressMoveFromServerData,
  decompressMoveDataWithI,
  MessageType,
} from "../../shared/communication.js"
import type { Direction } from "../../shared/Direction.js"
import { updatePosition } from "../../updatePosition.js"
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

export async function retrieveConnection2(
  connectionId: string,
): Promise<GetCommandOutput> {
  const ddb = createDynamoDBDocumentClient()
  return await ddb.send(
    new GetCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId,
      },
      ProjectionExpression: "x, y, direction, isMoving, whenHasChangedMoving",
    }),
  )
}

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  const requestBody = JSON.parse(event.body!)
  const moveData = decompressMoveDataWithI(requestBody.data)

  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
  })

  const output = await retrieveConnection2(event.requestContext.connectionId)

  let x
  let y
  if (output.Item) {
    const object = output.Item as Movable & { whenHasChangedMoving: number }
    updatePosition(
      object,
      event.requestContext.requestTimeEpoch - object.whenHasChangedMoving,
    )
    x = object.x
    y = object.y
  } else {
    x = 0
    y = 0
  }

  const isMoving = Boolean(moveData.isMoving)
  const direction = Number(moveData.direction) as Direction

  await ddb.send(
    new UpdateCommand({
      TableName: CONNECTIONS_TABLE_NAME,
      Key: { connectionId: event.requestContext.connectionId },
      UpdateExpression:
        "set x = :x, y = :y, direction = :direction, isMoving = :isMoving, whenHasChangedMoving = :whenHasChangedMoving",
      ExpressionAttributeValues: {
        ":x": x,
        ":y": y,
        ":direction": direction,
        ":isMoving": isMoving,
        ":whenHasChangedMoving": event.requestContext.requestTimeEpoch,
      },
    }),
  )

  const postData = JSON.stringify({
    type: MessageType.Move,
    data: compressMoveFromServerData({
      connectionId: event.requestContext.connectionId,
      i: Number(moveData.i),
      isMoving,
      x,
      y,
      direction,
    }),
  })

  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const connections = (await ddb.send(
      createScanCommand({ x, y }, lastEvaluatedKey),
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

  return { statusCode: 200 }
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
