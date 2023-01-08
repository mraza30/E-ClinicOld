import { ObjectId } from "mongoose";
import { Field, ID, InterfaceType } from "type-graphql";

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

import { UserRole } from "./types/userRoles.enum";
import { UerMethods } from "./user.methods";

@InterfaceType({
  isAbstract: true,
  resolveType: (user) => {
    if (user.role === "ADMIN") return "Admin";
    else if (user.role === "PATIENT") return "Patient";
    else if (user.role === "DOCTOR") return "Doctor";
  },
})
@modelOptions({ schemaOptions: { discriminatorKey: "role", timestamps: true } })
export class User extends UerMethods {
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
