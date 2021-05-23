import { Handler, Context, APIGatewayProxyEvent } from "aws-lambda";
import swaggerLambda from "swagger-lambda";
import FilmController from "./controllers/film.controller";
import KeyController from "./controllers/key.controller";

export const getFilms: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  return FilmController.getFilms(event, context);
};

export const getKeys: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  return KeyController.getKeys(event, context);
};

export const addKeys: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  return KeyController.addKey(event, context);
};

export const updateKey: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  return KeyController.updateKey(event, context);
};

exports.invoke = swaggerLambda;
