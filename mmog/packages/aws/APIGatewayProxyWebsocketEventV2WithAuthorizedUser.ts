import type {
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyWebsocketEventV2WithRequestContext,
} from "aws-lambda"

interface RequestContext extends APIGatewayEventWebsocketRequestContextV2 {
  authorizer: { userId: string }
}

export type APIGatewayProxyWebsocketEventV2WithAuthorizedUser =
  APIGatewayProxyWebsocketEventV2WithRequestContext<RequestContext>
