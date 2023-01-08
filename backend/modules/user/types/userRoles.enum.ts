import { registerEnumType } from "type-graphql";

export enum UserRole {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
registerEnumType(UserRole, {
  name: "UserRole",
});
