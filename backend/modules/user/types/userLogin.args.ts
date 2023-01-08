import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

import { User } from "../user.model";

@ArgsType()
export class UserLoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
