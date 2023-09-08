import { PutCommand } from "@aws-sdk/lib-dynamodb"
import type {
  APIGatewayProxyResultV2,
  APIGatewayProxyWebsocketEventV2,
} from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import { ObjectType } from "../../shared/ObjectType.js"
import { createDynamoDBDocumentClient } from "../createDynamoDBDocumentClient.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OBJECTS_TABLE_NAME: string
    }
  }
}

const { OBJECTS_TABLE_NAME } = process.env

const ddb = createDynamoDBDocumentClient()

export interface Plant {
  id: string
  type: ObjectType.Plant
  x: number
  y: number
}

function generatePlant(): Plant {
  return {
    id: randomUUID(),
    type: ObjectType.Plant,
    x: 0,
    y: 0,
  }
}

export async function handler(
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> {
  const plant = generatePlant()

  await ddb.send(
    new PutCommand({
      TableName: OBJECTS_TABLE_NAME,
      Item: plant,
    }),
  )

  return { statusCode: 200 }
}
