import { IsPositive } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

import { Sort } from "../../types/enum.types";
import { User } from "../user.model";
import { UserRole } from "./userRoles.enum";

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
