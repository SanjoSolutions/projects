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
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { MessageType } from "../../shared/communication.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTIONS_TABLE_NAME: string
      OBJECTS_TABLE_NAME: string
    }
  }
}

const { CONNECTIONS_TABLE_NAME, OBJECTS_TABLE_NAME } = process.env

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
      TableName: CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId: event.requestContext.connectionId,
      },
      ProjectionExpression: "x, y",
    }),
  )

  if (response.Item) {
    const position = { x: response.Item.x || 0, y: response.Item.y || 0 }

    const objects: any[] = []

    async function retrieveObjects(scanFunction: any): Promise<void> {
      let lastEvaluatedKey: Record<string, any> | undefined = undefined
      do {
        const connections = (await ddb.send(
          scanFunction(position, lastEvaluatedKey),
        )) as ScanCommandOutput
        const items = connections.Items
        if (items) {
          await Promise.all(
            items.map(async ({ connectionId, x, y, direction, isMoving }) => {
              if (connectionId !== event.requestContext.connectionId) {
                const character = { connectionId, x, y, direction, isMoving }
                objects.push(character)
              }
            }),
          )
        }

        lastEvaluatedKey = connections.LastEvaluatedKey
      } while (lastEvaluatedKey)
    }

    await Promise.all([
      retrieveObjects(createConnectionsScanCommand),
      retrieveObjects(createObjectsScanCommand),
    ])

    const postData = JSON.stringify({
      type: MessageType.Objects,
      data: {
        objects,
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

function createObjectsScanCommand(
  position: { x: number; y: number },
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  return createScanCommand(OBJECTS_TABLE_NAME, position, exclusiveStartKey)
}

function createConnectionsScanCommand(
  position: { x: number; y: number },
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  return createScanCommand(CONNECTIONS_TABLE_NAME, position, exclusiveStartKey)
}

function createScanCommand(
  tableName: string,
  position: { x: number; y: number },
  exclusiveStartKey?: Record<string, any>,
): ScanCommand {
  const input: ScanCommandInput = {
    TableName: tableName,
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
