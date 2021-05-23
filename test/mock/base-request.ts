import { APIGatewayProxyEvent } from "aws-lambda";

export const buildBaseRequest = (body: any, headers: any, httpMethod: string): APIGatewayProxyEvent => ({
  body: JSON.stringify(body),
  headers,
  multiValueHeaders: {},
  httpMethod,
  isBase64Encoded: false,
  path: "",
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: "",
    apiId: "",
    authorizer: {
      token: "",
    },
    protocol: "",
    httpMethod,
    identity: null,
    path: "",
    stage: "",
    requestId: "",
    requestTimeEpoch: null,
    resourceId: "",
    resourcePath: "",
  },
  resource: "",
});
