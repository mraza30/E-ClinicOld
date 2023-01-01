import { JwtPayload, verify } from "jsonwebtoken";

import { AuthChecker } from "type-graphql";
import { Context } from "../types";

/**
 * AuthChecker Definition for @Authorized Decorator
 */
export const authChecker: AuthChecker<Context, string> = async (
  { context: { req } },
  roles
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      process.env.JWT_SECRET
    ) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = <JwtPayload>verify(token, process.env.JWT_SECRET);

      if (roles.includes(decoded.role)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};
