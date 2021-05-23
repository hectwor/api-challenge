import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import log4js from "log4js";
import { MessageUtil } from "../utils/message";
import FilmService from "../services/film.service";

const logger = log4js.getLogger();
logger.level = "info";

class FilmController {
  async getFilms(_event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> {
    logger.info("functionName", context?.functionName);
    try {
      const result = await FilmService.getFilms();
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.errorWithStatus(err.status, err.message, err.data);
    }
  }
}
export default new FilmController();
