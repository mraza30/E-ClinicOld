import { Field, InputType, registerEnumType } from "type-graphql";
import {
  IsEmail,
  IsPhoneNumber,
  IsPositive,
  IsStrongPassword,
  Length,
} from "class-validator";

import { User } from "./user.dto";

//----------Enums----------

export enum UserRoles {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
registerEnumType(UserRoles, {
  name: "UserRoles",
});

export enum UserSortBy {
  fullName = "fullName",
  email = "email",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}
registerEnumType(UserSortBy, {
  name: "UserSortBy",
});

export enum Sort {
  asc = "asc",
  desc = "desc",
}
registerEnumType(Sort, {
  name: "Sort",
});

//----------Input Types----------

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
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @Field(() => UserRoles)
  role: UserRoles;
}

@InputType()
export class UsersFilter {
  @Field({ nullable: true })
  @IsPositive()
  limit?: number;

  @Field({ nullable: true })
  @IsPositive()
  offset?: number;

  @Field(() => UserRoles, { nullable: true })
  role?: UserRoles;

  @Field({ nullable: true })
  emailVerified?: boolean;

  @Field({ nullable: true })
  mobileVerified?: boolean;

  @Field({ nullable: true })
  active?: boolean;

  @Field(() => UserSortBy, { nullable: true })
  sortBy?: UserSortBy;

  @Field(() => Sort, { nullable: true })
  sort?: Sort;
}

//----------Arg Types----------
