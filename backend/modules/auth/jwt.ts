import { JwtPayload, verify } from "jsonwebtoken";
import { Request } from "express";

export async function verifyJwt(req: Request) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      process.env.JWT_SECRET
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const { _id, role, active } = <JwtPayload>(
        verify(token, process.env.JWT_SECRET)
      );

      req.user = {
        _id,
        role,
        active,
      };

      return { ...req.user };
    }
  } catch (error) {}
  return false;
}
