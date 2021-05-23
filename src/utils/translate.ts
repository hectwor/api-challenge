import { Key } from "../dto/key.dto";
import { DynamoDB } from "aws-sdk";

/**
 * TODO: esta función se usa para solo traducir un objecto de valores primarios
 * @param obj Objecto que sera traducido
 * @returns Nuevo objecto con llaves traducidas
 */

export const toTranslateOnlyObject = (obj: object, translate: Key[] | DynamoDB.DocumentClient.ItemList) => {
  const keys = Object.keys(obj);
  translate.forEach((values: Key) => {
    if (keys.find((key: string) => key === values.original)) {
      obj[values.translated] = obj[values.original];
      delete obj[values.original];
    }
  });
  return obj;
};

/**
 * TODO: esta función es para traducir cualquier objecto
 * @param obj Objecto que sera traducido
 * @returns Nuevo objecto con llaves traducidas
 */

export const toTranslate = (obj: object, translate: Key[] | DynamoDB.DocumentClient.ItemList) => {
  const keys = Object.keys(obj);
  keys.forEach((key: string) => {
    switch (typeof obj[key]) {
      case "object":
        if (Array.isArray(obj[key])) {
          if (typeof obj[key][0] === "object") {
            obj[key] = obj[key].map((obj: object) => toTranslate(obj, translate));
          } else {
            obj[key] = toTranslate(obj[key], translate);
          }
        }
      default:
        const tr = translate.find((values: Key) => key === values.original);
        if (tr) {
          obj[tr.translated] = obj[tr.original];
          delete obj[tr.original];
        }
        break;
    }
  });
  return obj;
};
