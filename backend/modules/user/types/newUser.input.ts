import { IsEmail, IsPhoneNumber, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { User } from "../user.model";
import { UserRole } from "./userRoles.enum";

@InputType()
export class NewUserInput implements Partial<User> {
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
  @MinLength(8)
  password: string;

  @Field(() => UserRole)
  role: UserRole;
}
