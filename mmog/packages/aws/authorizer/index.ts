import { CognitoJwtVerifier } from "aws-jwt-verify"
import type { APIGatewayRequestAuthorizerHandler } from "aws-lambda"

const UserPoolId = process.env.USER_POOL_ID!
const AppClientId = process.env.APP_CLIENT_ID!

export const handler: APIGatewayRequestAuthorizerHandler = async (
  event,
  context,
) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: UserPoolId,
      tokenUse: "id",
      clientId: AppClientId,
    })

    const encodedToken = event.queryStringParameters!.idToken!
    const payload = await verifier.verify(encodedToken)

    return allowPolicy(event.methodArn, payload)
  } catch (error: any) {
    console.log(error.message)
    return denyAllPolicy()
  }
}

const denyAllPolicy = () => {
  return {
    principalId: "*",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "*",
          Effect: "Deny",
          Resource: "*",
        },
      ],
    },
  }
}

const allowPolicy = (methodArn: string, idToken: any) => {
  return {
    principalId: idToken.sub,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: methodArn,
        },
      ],
    },
    context: {
      // set userId in the context
      userId: idToken.sub,
    },
  }
}
