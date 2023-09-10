import type { ScanCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

export async function scanThroughAll(
  createScanCommand: (
    lastEvaluatedKey: Record<string, any> | undefined,
  ) => ScanCommand,
  doSomethingWithOutput: (output: ScanCommandOutput) => Promise<void>,
): Promise<void> {
  const database = createDynamoDBDocumentClient()
  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const output = (await database.send(
      createScanCommand(lastEvaluatedKey),
    )) as ScanCommandOutput
    lastEvaluatedKey = output.LastEvaluatedKey
    await doSomethingWithOutput(output)
  } while (lastEvaluatedKey)
}
