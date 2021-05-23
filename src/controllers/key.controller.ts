import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import log4js from "log4js";
import { MessageUtil } from "../utils/message";
import KeyService from "../services/key.service";
import { addKey } from "./schemas/key.schema";
import { BodyIncorrect } from "../helpers/errors";

const logger = log4js.getLogger();
logger.level = "info";

class KeyController {
  async addKey(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
    logger.info("functionName", context?.functionName);
    try {
      const body = JSON.parse(event.body);
      const { error } = addKey.validate(body);
      if (error) {
        throw BodyIncorrect(error.message);
      }
      const result = await KeyService.addKey(body);
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.errorWithStatus(err.status, err.message, err.data);
    }
  }

  async updateKey(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
    logger.info("functionName", context?.functionName);
    try {
      const body = JSON.parse(event.body);
      const { error } = addKey.validate(body);
      if (error) {
        throw BodyIncorrect(error.message);
      }
      const result = await KeyService.updateKey(body);
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.errorWithStatus(err.status, err.message, err.data);
    }
  }

  async getKeys(_event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
    logger.info("functionName", context?.functionName);
    try {
      const result = await KeyService.getKeys();
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.errorWithStatus(err.status, err.message, err.data);
    }
  }
}
export default new KeyController();
