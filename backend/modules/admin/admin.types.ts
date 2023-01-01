import { ArgsType, Field, registerEnumType } from "type-graphql";
import { IsStrongPassword, Length } from "class-validator";

import { Admin } from "./admin.model";

/**
 * *enumTypes
 */
export enum AdminRole {
  "ADMIN" = "ADMIN",
  "ROOT" = "ROOT",
}
registerEnumType(AdminRole, {
  name: "AdminRole",
});

/**
 * *ArgsType for resolver mutation login & register admin
 */
@ArgsType()
export class AdminInput implements Partial<Admin> {
  @Field()
  @Length(5, 20)
  adminName: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
