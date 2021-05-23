import { DynamoDB } from "aws-sdk";
import log4js from "log4js";
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

export const getAllKeys = async (): Promise<DynamoDB.DocumentClient.ScanOutput> => {
  const table = process.env.KEYS_TABLE;
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: table,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return result;
  } catch (error) {
    logger.error(error);
    throw { message: Messages.genericError };
  }
};

export const getKey = async (original: string): Promise<DynamoDB.DocumentClient.GetItemOutput> => {
  const table = process.env.KEYS_TABLE;
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: table,
    Key: {
      original,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    return result;
  } catch (error) {
    logger.error(error);
    throw { message: Messages.genericError };
  }
};
