import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi"
import type { ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy.js"
import { MessageType } from "../../shared/communication/communication.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { updatePosition } from "../../updatePosition.js"
import type { APIGatewayProxyWebsocketEventV2WithAuthorizedUser } from "../APIGatewayProxyWebsocketEventV2WithAuthorizedUser.js"
import { retrieveObjectByUserID } from "../database/retrieveObjectByUserID.js"
import { scanThroughAll } from "../database/scanThroughAll.js"
import { postToConnection } from "../websocket/postToConnection.js"

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

export async function handler(
  event: APIGatewayProxyWebsocketEventV2WithAuthorizedUser,
): Promise<APIGatewayProxyResultV2> {
  const userID = event.requestContext.authorizer.userId
  const object = await retrieveObjectByUserID(userID, ["x", "y"])

  if (object) {
    const position = { x: object.x || 0, y: object.y || 0 }

    const objects: any[] = []

    async function retrieveObjects(
      createScanCommandInput: (position: {
        x: number
        y: number
      }) => ScanCommandInput,
    ): Promise<void> {
      await scanThroughAll(
        () => createScanCommandInput(position),
        async (output) => {
          const items = output.Items
          if (items) {
            await Promise.all(
              items.map(
                async ({
                  id,
                  userID,
                  x,
                  y,
                  direction,
                  isMoving,
                  type,
                  whenMovingHasChanged,
                  plantType,
                  stage,
                }) => {
                  const object: any = {
                    id,
                    userID,
                    x,
                    y,
                    direction,
                    isMoving,
                    type: type || ObjectType.Character,
                    plantType,
                    stage,
                  }
                  if (userID === event.requestContext.authorizer.userId) {
                    object.isCharacterOfClient = true
                  }
                  if (isMoving) {
                    updatePosition(object, Date.now() - whenMovingHasChanged)
                  }
                  objects.push(object)
                },
              ),
            )
          }
        },
      )
    }

    await retrieveObjects(createObjectsScanCommandInput)

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

    await postToConnection(
      apiGwManagementApi,
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

function createObjectsScanCommandInput(position: {
  x: number
  y: number
}): ScanCommandInput {
  return {
    TableName: OBJECTS_TABLE_NAME,
    ProjectionExpression:
      "id, userID, x, y, direction, isMoving, #type, whenMovingHasChanged, plantType, stage",
    FilterExpression: "x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2",
    ExpressionAttributeValues: {
      ":x1": position.x - HALF_WIDTH,
      ":x2": position.x + HALF_WIDTH,
      ":y1": position.y - HALF_HEIGHT,
      ":y2": position.y + HALF_HEIGHT,
    },
    ExpressionAttributeNames: {
      "#type": "type",
    },
  }
}

function createConnectionsScanCommandInput(position: {
  x: number
  y: number
}): ScanCommandInput {
  return {
    TableName: CONNECTIONS_TABLE_NAME,
    ProjectionExpression:
      "connectionId, x, y, direction, isMoving, #type, id, whenMovingHasChanged",
    FilterExpression: "x BETWEEN :x1 AND :x2 AND y BETWEEN :y1 AND :y2",
    ExpressionAttributeValues: {
      ":x1": position.x - HALF_WIDTH,
      ":x2": position.x + HALF_WIDTH,
      ":y1": position.y - HALF_HEIGHT,
      ":y2": position.y + HALF_HEIGHT,
    },
    ExpressionAttributeNames: {
      "#type": "type",
    },
  }
}
