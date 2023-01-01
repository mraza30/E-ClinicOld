import { ArgsType, Field, InputType } from "type-graphql";
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from "class-validator";

import { User } from "./user.model";
import { registerEnumType } from "type-graphql";

/**
 * *enum types
 */
export enum UserRole {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
registerEnumType(UserRole, {
  name: "UserRole",
});

/**
 * *InputTypes
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

/**
 * *ArgsTypes
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
