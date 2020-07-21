import logger from "./app.logger";
import dotenv from "dotenv";
import fs from "fs";

import { IConnectionObject } from './models/secrets.model';

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug("Using .env.example file to supply config environment variables");
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const DATABASE_NAME = process.env.DATABASE_NAME;

const connectionObject: IConnectionObject = {
  production: process.env.PROD_DB_URI,
  development: process.env.DEV_DB_URI,
  test: process.env.TEST_DB_URI
}
export const MONGODB_URI = connectionObject[ENVIRONMENT as keyof IConnectionObject];

export const SERVER_PORT = process.env.SERVER_PORT;

if (!MONGODB_URI) {
  logger.error("No mongo connection string. Set appropriate environment variable.");
  process.exit(1);
}
