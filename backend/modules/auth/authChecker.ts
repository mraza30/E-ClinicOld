import { AuthChecker } from "type-graphql";
import { Context } from "../types";
import { verifyJwt } from "./jwt";

/**
 * AuthChecker Definition for @Authorized Decorator
 * !: AuthChecker<Context, string> removed to use function separately other than as decorator
 */
export const authChecker = async (
  { context: { req } }: any,
  roles: string[]
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
