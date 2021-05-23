import { DynamoDB } from "aws-sdk";
import log4js from "log4js";
import { v4 as uuidv4 } from "uuid";
import { Messages } from "../../helpers/constants";

const logger = log4js.getLogger();
logger.level = "info";

const dynamoDb =
  process.env.IS_OFFLINE === "true"
    ? new DynamoDB.DocumentClient({
        region: "localhost",
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        endpoint: process.env.DYNAMODB_LOCAL,
      })
    : new DynamoDB.DocumentClient({ region: process.env.SERVERLESS_REGION });

export const putKey = async (original: string, translated: string): Promise<DynamoDB.DocumentClient.PutItemOutput> => {
  const table = process.env.KEYS_TABLE;
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: table,
    Item: {
      id: uuidv4(),
      original,
      translated,
    },
  };
  try {
    const result = await dynamoDb.put(params).promise();
    return result;
  } catch (error) {
    logger.error(error);
    throw { message: Messages.genericError };
  }
};
