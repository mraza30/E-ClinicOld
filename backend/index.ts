import "reflect-metadata";

import dotenv from "dotenv";

import { BuildSchema } from "./modules/schema";
import { ConnectDatabase } from "./utils/database";
import { StartServer } from "./utils/server";

dotenv.config();

const PORT: number = +`${process.env.PORT}`;

(async function main() {
  await ConnectDatabase();

  const schema = await BuildSchema();

  await StartServer(schema, PORT);
})();
