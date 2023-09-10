import {
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb"
import { createDynamoDBDocumentClient } from "./createDynamoDBDocumentClient.js"

export async function scanThroughAll(
  createScanInput: () => ScanCommandInput,
  doSomethingWithOutput: (output: ScanCommandOutput) => Promise<void>,
): Promise<void> {
  const database = createDynamoDBDocumentClient()
  let lastEvaluatedKey: Record<string, any> | undefined = undefined
  do {
    const input = createScanInput()
    if (lastEvaluatedKey) {
      input.ExclusiveStartKey = lastEvaluatedKey
    }
    const output = (await database.send(
      new ScanCommand(input),
    )) as ScanCommandOutput
    lastEvaluatedKey = output.LastEvaluatedKey
    await doSomethingWithOutput(output)
  } while (lastEvaluatedKey)
}
