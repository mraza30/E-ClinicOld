import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

import { ObjectId } from "mongoose";
import { UserRoles } from "./user.types";

@ObjectType()
export class User {
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

  @Field(() => UserRoles)
  @prop({ enum: UserRoles, required: true })
  role: UserRoles;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
