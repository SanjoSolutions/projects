import { QueryCommand, QueryCommandOutput } from "@aws-sdk/lib-dynamodb"
import type { Object } from "../../shared/database.js"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

type Item = Pick<Object, "x" | "y">

export async function retrievePositionOfObjectOfConnection(
  connectionId: string,
): Promise<Item | null> {
  const database = createDynamoDBDocumentClient()
  const output = (await database.send(
    new QueryCommand({
      TableName: process.env.OBJECTS_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": connectionId,
      },
      ProjectionExpression: "x, y",
    }),
  )) as Omit<QueryCommandOutput, "Items"> & {
    Items?: Item[]
  }
  if (output.Items && output.Items.length >= 1) {
    return output.Items[0]
  } else {
    return null
  }
}
