import * as cdk from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2"
import * as cognito from "aws-cdk-lib/aws-cognito"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as iam from "aws-cdk-lib/aws-iam"
import * as sam from "aws-cdk-lib/aws-sam"
import type { Construct } from "constructs"
import * as path from "node:path"

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const connections = new dynamodb.TableV2(this, "Connections", {
      partitionKey: {
        name: "connectionId",
        type: dynamodb.AttributeType.STRING,
      },
      billing: dynamodb.Billing.provisioned({
        readCapacity: dynamodb.Capacity.fixed(15),
        writeCapacity: dynamodb.Capacity.fixed(15),
      }),
    })

    const objects = new dynamodb.TableV2(this, "Objects", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billing: dynamodb.Billing.provisioned({
        readCapacity: dynamodb.Capacity.fixed(5),
        writeCapacity: dynamodb.Capacity.fixed(5),
      }),
    })

    const api = new apigatewayv2.CfnApi(this, "WebSocket", {
      name: "WebSocket",
      protocolType: "WEBSOCKET",
      routeSelectionExpression: "$request.body.type",
    })

    const deployment = new apigatewayv2.CfnDeployment(this, "Deployment", {
      apiId: api.ref,
    })

    const stage = new apigatewayv2.CfnStage(this, "Stage", {
      apiId: api.ref,
      deploymentId: deployment.ref,
      stageName: "Prod",
      description: "Prod Stage",
    })

    const cloudWatchRole = new iam.CfnRole(this, "CloudWatchRole", {
      assumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Service: "apigateway.amazonaws.com",
            },
            Action: "sts:AssumeRole",
          },
        ],
      },
      path: "/",
      managedPolicyArns: [
        "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs",
      ],
    })

    const account = new apigateway.CfnAccount(this, "Account", {
      cloudWatchRoleArn: cloudWatchRole.attrArn,
    })

    const userPool = new cognito.UserPool(this, "UserPool", {
      autoVerify: {
        email: true,
      },
    })

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
    })

    const onConnectionFunction = new sam.CfnFunction(
      this,
      "OnConnectionFunction",
      {
        entry: path.resolve(
          path.dirname(import.meta.url),
          "../../aws/onConnect/index.ts",
        ),
        memorySize: 256,
        aaa: 1,
        environment: {
          CONNECTIONS_TABLE_NAME: connections.tableName,
          OBJECTS_TABLE_NAME: objects.tableName,
        },
        policies: [
          {
            dynamoDbCrudPolicy: {
              tableName: connections.tableName,
            },
          },
          {
            dynamoDbCrudPolicy: {
              tableName: objects.tableName,
            },
          },
          {
            statement: {
              effect: "Allow",
              actions: ["execute-api:ManageConnections"],
              resources: [
                `arn:aws:execute-api:${this.region}:${this.account}:${api.ref}/*`,
              ],
            },
          },
        ],
      },
    )
  }
}
