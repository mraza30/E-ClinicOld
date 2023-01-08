import { ObjectId } from "mongoose";
import { Request, Response } from "express";

/**
 * Extending express request type
 */
declare module "express" {
  interface Request {
    user: { _id: ObjectId; role: string; active: boolean };
  }
}

export interface Context {
  req: Request;
  res: Response;
}
