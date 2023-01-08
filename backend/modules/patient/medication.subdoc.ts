import { Field, ObjectType } from "type-graphql";

import { modelOptions, prop } from "@typegoose/typegoose";

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
