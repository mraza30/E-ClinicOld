import "reflect-metadata";

import * as dotenv from "dotenv";

import { BuildSchema } from "./graphql/schema";
import { ConnectDatabase } from "./utils/database";
import { StartServer } from "./utils/server";

dotenv.config();

const PORT: number = +`${process.env.PORT}`;

(async function main() {
  await ConnectDatabase();

  const schema = await BuildSchema();

  await StartServer(schema, PORT);
})();
