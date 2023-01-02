import { Field, ObjectType } from "type-graphql";
import {
  getDiscriminatorModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User, UserModel, UserRole } from "../user/user.dto";

/**
 * Medication SubDocument and Object
 */
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

/**
 * EMR SubDocument and Object
 */
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

/**
 * Patient Model and Object inheriting User
 */
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
