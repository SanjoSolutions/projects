import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"
import {
  Action,
  compressMoveFromServerData,
  decompressMoveData,
} from "@sanjo/mmog-shared/communication.js"
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    apiVersion: "2012-08-10",
    region: process.env.AWS_REGION,
  }),
)

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TABLE_NAME: string
    }
  }
}

const { TABLE_NAME } = process.env

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  let connectionData

  try {
    const scanCommand = new ScanCommand({
      TableName: TABLE_NAME,
      ProjectionExpression: "connectionId",
    })
    connectionData = await ddb.send(scanCommand)
  } catch (error: any) {
    return { statusCode: 500, body: error.stack }
  }

  const apiGwManagementApi = new ApiGatewayManagementApiClient({
    apiVersion: "2018-11-29",
    endpoint:
      "https://" +
      event.requestContext.domainName +
      "/" +
      event.requestContext.stage,
  })

  const requestBody = JSON.parse(event.body!)
  const moveData = decompressMoveData(requestBody.data)
  const postData = JSON.stringify({
    action: Action.Move,
    data: compressMoveFromServerData({
      connectionId: event.requestContext.connectionId!,
      i: Number(moveData.i),
      isMoving: Boolean(moveData.isMoving),
      x: Number(moveData.x),
      y: Number(moveData.y),
      direction: Number(moveData.direction),
    }),
  })

  const items = connectionData.Items

  if (items) {
    const promises: Promise<any>[] = items.map(async ({ connectionId }) => {
      if (connectionId !== event.requestContext.connectionId) {
        try {
          const postToConnectionCommand = new PostToConnectionCommand({
            ConnectionId: connectionId,
            Data: postData,
          })
          await apiGwManagementApi.send(postToConnectionCommand)
        } catch (error: any) {
          if (error.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`)
            const deleteCommand = new DeleteCommand({
              TableName: TABLE_NAME,
              Key: { connectionId },
            })
            await ddb.send(deleteCommand)
          } else {
            throw error
          }
        }
      }
    })

    promises.push(
      ddb.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { connectionId: event.requestContext.connectionId },
          UpdateExpression: "set x = :x, y = :y, direction = :direction",
          ExpressionAttributeValues: {
            ":x": moveData.x,
            ":y": moveData.y,
            ":direction": moveData.direction,
          },
        }),
      ),
    )

    try {
      await Promise.all(promises)
    } catch (error: any) {
      return { statusCode: 500, body: error.stack }
    }
  }

  return { statusCode: 200, body: "Data sent." }
}
