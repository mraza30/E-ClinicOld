import { ObjectType } from "type-graphql";
import { getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { User, UserModel, UserRole } from "../user/user.dto";

@ObjectType({ implements: User })
export class Admin extends User {}
export const AdminModel = getDiscriminatorModelForClass(
  UserModel,
  Admin,
  UserRole.ADMIN
);
