import { Field, ID, InterfaceType } from "type-graphql";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

import { ModelMethods } from "../helper/mongoMethods";
import { ObjectId } from "mongoose";
import { Patient } from "../patient/patient.model";
import { UserRole } from "./user.types";

@InterfaceType({
  resolveType: (user) => {
    if (user.role === "PATIENT") return Patient;
  },
})
@modelOptions({ schemaOptions: { discriminatorKey: "role", timestamps: true } })
export class User extends ModelMethods {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  fullName: string;

  @Field()
  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Field()
  @prop({ required: true, unique: true })
  phoneNo: string;

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: false })
  emailVerified: boolean;

  @Field()
  @prop({ required: true, default: false })
  phoneVerified: boolean;

  @Field()
  @prop({ required: true, default: false })
  active: boolean;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserModel = getModelForClass(User);
