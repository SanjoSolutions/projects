import { GetCommand, GetCommandOutput } from "@aws-sdk/lib-dynamodb"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

export async function retrieveConnection(
  connectionId: string,
): Promise<GetCommandOutput> {
  const ddb = createDynamoDBDocumentClient()
  return await ddb.send(
    new GetCommand({
      TableName: process.env.CONNECTIONS_TABLE_NAME,
      Key: {
        connectionId,
      },
      ProjectionExpression: "x, y",
    }),
  )
}
