import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb"
import { MessageType } from "@sanjo/mmog-shared/communication.js"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TABLE_NAME: string
    }
  }
}

const { TABLE_NAME } = process.env

const MAXIMUM_SUPPORTED_RESOLUTION = {
  width: 2560,
  height: 1440,
}

const HALF_WIDTH = Math.ceil(MAXIMUM_SUPPORTED_RESOLUTION.width / 2)
const HALF_HEIGHT = Math.ceil(MAXIMUM_SUPPORTED_RESOLUTION.height / 2)

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    apiVersion: "2012-08-10",
    region: process.env.AWS_REGION,
  }),
)

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  const response = await ddb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        connectionId: event.requestContext.connectionId,
      },
      ProjectionExpression: "x, y",
    }),
  )

  if (response.Item) {
    const position = { x: response.Item.x || 0, y: response.Item.y || 0 }

    const characters: any[] = []

    let lastEvaluatedKey: Record<string, any> | undefined = undefined
    do {
      const connections = (await ddb.send(
        createScanCommand(position, lastEvaluatedKey),
      )) as ScanCommandOutput
      const items = connections.Items
      if (items) {
        await Promise.all(
          items.map(async ({ connectionId, x, y, direction, isMoving }) => {
            if (connectionId !== event.requestContext.connectionId) {
              const character = { connectionId, x, y, direction, isMoving }
              characters.push(character)
            }
          }),
        )
      }

      lastEvaluatedKey = connections.LastEvaluatedKey
    } while (lastEvaluatedKey)

    const postData = JSON.stringify({
      type: MessageType.Characters,
      data: {
        characters,
      },
    })

    const apiGwManagementApi = new ApiGatewayManagementApiClient({
      apiVersion: "2018-11-29",
      endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
    })

    await apiGwManagementApi.send(
      new PostToConnectionCommand({
        ConnectionId: event.requestContext.connectionId,
        Data: postData,
      }),
    )

    return { statusCode: 200 }
  } else {
    return { statusCode: 500 }
  }
}

function createScanCommand(
  position: { x: number; y: number },
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  const input: ScanCommandInput = {
    TableName: TABLE_NAME,
    ProjectionExpression: "connectionId, x, y, direction, isMoving",
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
