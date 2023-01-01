import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

import { AdminRole } from "./admin.types";
import { ModelMethods } from "../helper/mongoMethods";
import { ObjectId } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Admin extends ModelMethods {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @prop({ required: true, unique: true })
  adminName: string;

  @prop({ required: true })
  password: string;

  @Field(() => AdminRole)
  @prop({ enum: AdminRole, required: true, default: "ADMIN" })
  role: AdminRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
export const AdminModel = getModelForClass(Admin);
