import { ObjectType } from "type-graphql";

import { getDiscriminatorModelForClass } from "@typegoose/typegoose";

import { UserRole } from "../user/types/userRoles.enum";
import { User, UserModel } from "../user/user.model";

@ObjectType({ implements: User })
export class Doctor extends User {}
export const DoctorModel = getDiscriminatorModelForClass(
  UserModel,
  Doctor,
  UserRole.DOCTOR
);
