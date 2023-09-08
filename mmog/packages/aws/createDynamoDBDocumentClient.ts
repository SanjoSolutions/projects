import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

export function createDynamoDBDocumentClient(): DynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      apiVersion: "2012-08-10",
      region: process.env.AWS_REGION,
    }),
  )
}
