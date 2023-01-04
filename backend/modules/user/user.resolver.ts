import { ApolloError } from "apollo-server-express";
import { ObjectId } from "mongoose";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  User,
  UserLoginInput,
  UserModel,
  UserRegisterInput,
  UsersFilter,
} from "./user.dto";
import { AdminModel } from "../admin/admin.dto";
import { PatientModel } from "../patient/patient.dto";
import { DoctorModel } from "../doctor/doctor.dto";
import { authChecker } from "../auth/authChecker";
import { Context } from "../types";

@Resolver(() => User)
export class UserResolver {
  @Authorized("ADMIN")
  @Query(() => [User])
  async users(@Arg("filter", { nullable: true }) filter?: UsersFilter) {
    if (filter)
      var { sort, active, emailVerified, limit, mobileVerified, offset, role } =
        filter;
    return await UserModel.find({
      role: role ?? ["ADMIN", "DOCTOR", "PATIENT"],
      emailVerified: emailVerified ?? [true, false],
      mobileVerified: mobileVerified ?? [true, false],
      active: active ?? [true, false],
    })
      .sort({ ["createdAt"]: sort ?? "desc" })
      .skip(offset ?? 0)
      .limit(limit ?? 100);
  }

  @Authorized("ADMIN")
  @Query(() => User, { nullable: true })
  async user(@Arg("_id", () => ID) _id: ObjectId) {
    return await UserModel.findById(_id);
  }

  @Authorized("ADMIN", "PATIENT", "DOCTOR")
  @Query(() => User)
  async me(@Ctx() { req }: Context) {
    return UserModel.findById(req.user._id);
  }

  @Mutation(() => User)
  async login(
    @Args() { email, password }: UserLoginInput,
    @Ctx() { res }: Context
  ) {
    const user = await UserModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = await user.generateToken();
      token && res.header("X-Auth-Token", token);
      return user;
    }
    throw new ApolloError("invalid credentials");
  }

  @Mutation(() => User)
  async newUser(
    @Arg("input") { role, password, ...rest }: UserRegisterInput,
    @Ctx() { req }: Context
  ) {
    if (role === "PATIENT")
      return await PatientModel.create({
        ...rest,
        password: await UserModel.hashPassword(password),
      });
    else if (role === "DOCTOR")
      return await DoctorModel.create({
        ...rest,
        password: await UserModel.hashPassword(password),
      });
    else if (
      role === "ADMIN" &&
      (await authChecker({ context: { req } }, ["ADMIN"]))
    )
      return await AdminModel.create({
        ...rest,
        password: await UserModel.hashPassword(password),
      });
    throw new ApolloError("you may not be authorized to perform this action");
  }

  @Authorized("ADMIN")
  @Mutation(() => User)
  async deleteUser(@Arg("_id", () => ID) _id: ObjectId) {
    const user = await UserModel.findByIdAndDelete(_id);
    return user;
  }
}
