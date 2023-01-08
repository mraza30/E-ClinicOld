import { ObjectType } from "type-graphql";

import { getDiscriminatorModelForClass } from "@typegoose/typegoose";

import { UserRole } from "../user/types/userRoles.enum";
import { User, UserModel } from "../user/user.model";

@ObjectType({ implements: User })
export class Admin extends User {}
export const AdminModel = getDiscriminatorModelForClass(
  UserModel,
  Admin,
  UserRole.ADMIN
);
