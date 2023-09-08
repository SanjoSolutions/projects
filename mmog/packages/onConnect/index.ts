import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TABLE_NAME: string
    }
  }
}

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    apiVersion: "2012-08-10",
    region: process.env.AWS_REGION,
  }),
)

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    await ddb.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          connectionId: event.requestContext.connectionId,
        },
      }),
    )
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(err),
    }
  }

  return { statusCode: 200, body: "Connected." }
}
