import { ObjectType } from "type-graphql";
import { getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { User, UserModel, UserRole } from "../user/user.dto";

@ObjectType({ implements: User })
export class Doctor extends User {}
export const DoctorModel = getDiscriminatorModelForClass(
  UserModel,
  Doctor,
  UserRole.DOCTOR
);
