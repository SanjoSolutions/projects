import { GetCommand, GetCommandOutput } from "@aws-sdk/lib-dynamodb"
import type { Connection } from "../../shared/database.js"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

export async function retrieveConnection<T extends (keyof Connection)[]>(
  connectionId: string,
  attributes: T,
): Promise<
  Omit<GetCommandOutput, "Item"> & {
    Item?: Pick<Connection, T[number]>
  }
> {
  const database = createDynamoDBDocumentClient()
  return (await database.send(
    new GetCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId,
      },
      ProjectionExpression: attributes.join(", "),
    }),
  )) as Omit<GetCommandOutput, "Item"> & {
    Item?: Pick<Connection, T[number]>
  }
}
