import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  registerEnumType,
} from "type-graphql";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
  IsPositive,
} from "class-validator";
import { UerMethods } from "./user.methods";

/**
 * Enum Types
 */
export enum UserRole {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
registerEnumType(UserRole, {
  name: "UserRole",
});

export enum Sort {
  ASC = "asc",
  DESC = "desc",
}
registerEnumType(Sort, {
  name: "Sort",
});

/**
 * User Model and Interface
 */
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

/**
 * InputTypes
 */
@InputType()
export class UserRegisterInput implements Partial<User> {
  @Field()
  @Length(5, 30)
  fullName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsPhoneNumber()
  phoneNo: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field(() => UserRole)
  role: UserRole;
}

@InputType()
export class UsersFilter implements Partial<User> {
  @Field(() => Int, { nullable: true })
  @IsPositive()
  offset?: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  limit?: number;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field({ nullable: true })
  emailVerified?: boolean;

  @Field({ nullable: true })
  mobileVerified?: boolean;

  @Field({ nullable: true })
  active?: boolean;

  @Field(() => Sort, { nullable: true })
  sort?: Sort;
}

/**
 * ArgsTypes
 */
@ArgsType()
export class UserLoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
