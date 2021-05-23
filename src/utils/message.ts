import * as lambda from "aws-lambda";

export class MessageUtil {
  static success(data: object): lambda.APIGatewayProxyResult {
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  static errorWithStatus(status: number, message: string, data?: object): lambda.APIGatewayProxyResult {
    return { statusCode: status, body: JSON.stringify({ message: message, data: data }) };
  }
}
