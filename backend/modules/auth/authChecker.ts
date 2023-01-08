import { AuthChecker } from "type-graphql";
import { Context } from "../../types";
import { verifyJwt } from "./jwt";

export const authChecker: AuthChecker<Context, string> = async (
  { context: { req } },
  roles
) => {
  const decode = await verifyJwt(req);
  if (decode) {
    const { role, active } = decode;
    if (roles.includes(role)) {
      if (role === "ADMIN" && !active) {
        return false;
      }
      return true;
    }
  }
  return false;
};
