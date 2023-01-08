import { Field, ObjectType } from "type-graphql";

import { modelOptions, prop } from "@typegoose/typegoose";

import { Medication } from "./medication.subdoc";

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
