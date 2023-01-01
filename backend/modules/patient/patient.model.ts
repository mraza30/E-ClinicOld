import { Field, ObjectType } from "type-graphql";
import { User, UserModel } from "../user/user.model";
import {
  getDiscriminatorModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

import { UserRole } from "../user/user.types";

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class Medication {
  @Field()
  @prop()
  name: string;

  @Field({ nullable: true })
  @prop()
  dosage?: string;

  @Field({ nullable: true })
  @prop()
  frequency?: string;

  @Field({ nullable: true })
  @prop()
  notes?: string;
}

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class EMR {
  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String] })
  allergies?: string[];

  @Field(() => [Medication], { nullable: true })
  @prop({ type: () => [Medication] })
  currentMedications?: Medication[];

  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String] })
  immunizations?: string[];

  @Field({ nullable: true })
  @prop()
  medicalHistory?: string;

  @Field({ nullable: true })
  @prop()
  notes?: string;
}

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
