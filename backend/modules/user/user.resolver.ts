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
import { PatientModel } from "../patient/patient.model";
import { Context } from "../types";
import { User, UserModel } from "./user.model";
import { UserLoginInput, UserRegisterInput } from "./user.types";

@Resolver(() => User)
export class UserResolver {
  @Authorized("ADMIN")
  @Query(() => [User])
  async users() {
    return await UserModel.find();
  }

  @Authorized("ADMIN")
  @Query(() => User, { nullable: true })
  async user(@Arg("_id", () => ID) _id: ObjectId) {
    return await UserModel.findById(_id);
  }

  @Authorized("PATIENT", "DOCTOR")
  @Query(() => User)
  async me(@Ctx() { req }: Context) {
    return UserModel.findById(req.user._id);
  }

  @Query(() => User)
  async userLogin(
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
  async newUser(@Arg("input") { role, password, ...rest }: UserRegisterInput) {
    if (role === "PATIENT")
      return await PatientModel.create({
        ...rest,
        password: await UserModel.hashPassword(password),
      });
    else if (role === "DOCTOR") return {};
  }

  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async deleteUser(@Arg("_id", () => ID) _id: ObjectId) {
    const user = await UserModel.findByIdAndDelete(_id);
    return user ? true : false;
  }
}
