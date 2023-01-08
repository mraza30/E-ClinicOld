import { getDiscriminatorModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { UserRole } from "../user/types/userRoles.enum";
import { User, UserModel } from "../user/user.model";
import { EMR } from "./emr.subdoc";

@ObjectType({ implements: User })
export class Patient extends User {
  @Field(() => EMR, { nullable: true })
  @prop()
  emr?: EMR;
}
export const PatientModel = getDiscriminatorModelForClass(
  UserModel,
  Patient,
  UserRole.PATIENT
);
