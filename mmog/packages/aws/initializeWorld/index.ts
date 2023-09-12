import { PutCommand } from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy.js"
import { randomUUID } from "node:crypto"
import type { Plant } from "../../shared/database.js"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { PlantType } from "../../shared/PlantType.js"
import { createDynamoDBDocumentClient } from "../database/createDynamoDBDocumentClient.js"

Error.stackTraceLimit = Infinity

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OBJECTS_TABLE_NAME: string
    }
  }
}

const { OBJECTS_TABLE_NAME } = process.env

const database = createDynamoDBDocumentClient()

function generatePlant(): Plant {
  return {
    id: randomUUID(),
    type: ObjectType.Plant,
    x: 0,
    y: 0,
    isMoving: false,
    direction: Direction.Down,
    whenMovingHasChanged: Date.now(),
    plantType: PlantType.Tomato,
    stage: 0,
  }
}

export async function handler(): Promise<APIGatewayProxyResultV2> {
  const plant = generatePlant()

  await database.send(
    new PutCommand({
      TableName: OBJECTS_TABLE_NAME,
      Item: plant,
    }),
  )

  return { statusCode: 200 }
}
