import { UserResolver } from "./user/user.resolver";
import { authChecker } from "./auth/authChecker";
import { buildSchema } from "type-graphql";

export async function BuildSchema() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: "isoDate",
    authChecker,
    validate: { forbidUnknownValues: false },
  });
  return schema;
}
