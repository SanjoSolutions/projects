import { QueryCommand, QueryCommandOutput } from "@aws-sdk/lib-dynamodb"
import type { Object } from "../../shared/database.js"
import type { ID } from "../../shared/ID.js"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

export async function retrieveObjectByUserID<T extends (keyof Object)[]>(
  userID: ID,
  attributes: T,
): Promise<Pick<Object, T[number]> | null> {
  const database = createDynamoDBDocumentClient()
  const output = (await database.send(
    new QueryCommand({
      TableName: process.env.OBJECTS_TABLE_NAME,
      IndexName: "UserIDIndex",
      KeyConditionExpression: "userID = :userID",
      ExpressionAttributeValues: {
        ":userID": userID,
      },
      ProjectionExpression: attributes.join(", "),
    }),
  )) as Omit<QueryCommandOutput, "Items"> & {
    Items?: Pick<Object, T[number]>[]
  }
  if (output.Items && output.Items.length >= 1) {
    return output.Items[0]
  } else {
    return null
  }
}
