import { AdminResolver } from "./admin/admin.resolver";
import { authChecker } from "./auth/auth";
import { buildSchema } from "type-graphql";

export async function BuildSchema() {
  const schema = await buildSchema({
    resolvers: [AdminResolver],
    dateScalarMode: "isoDate",
    authChecker,
  });
  return schema;
}
