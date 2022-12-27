import { UserResolver } from "./user/user.resolver";
import { buildSchema } from "type-graphql";

export async function BuildSchema() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: "isoDate",
  });
  return schema;
}
