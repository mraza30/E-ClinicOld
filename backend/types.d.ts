import { ObjectId } from "mongoose";

declare module "express" {
  interface Request {
    user: { _id: ObjectId; role: string };
  }
}
