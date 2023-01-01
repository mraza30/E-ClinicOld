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
import { Context } from "../types";

import { Admin, AdminModel } from "./admin.model";
import { AdminInput } from "./admin.types";

@Resolver(() => Admin)
export class AdminResolver {
  @Authorized("ROOT")
  @Query(() => [Admin])
  async admins() {
    return await AdminModel.find().sort({ createdAt: "asc" });
  }

  @Authorized("ROOT")
  @Query(() => Admin, { nullable: true })
  async admin(@Arg("IdOrName") IdOrName: String) {
    return await AdminModel.findOne().or([
      { id: IdOrName },
      { adminName: IdOrName },
    ]);
  }

  @Mutation(() => Admin)
  async adminLogin(
    @Args() { adminName, password }: AdminInput,
    @Ctx() { res }: Context
  ) {
    const admin = await AdminModel.findOne({ adminName });
    if (admin && (await admin.comparePassword(password))) {
      const token = await admin.generateToken();
      token && res.header("X-Auth-Token", token);
      return admin;
    }
    throw new ApolloError("invalid credentials");
  }

  @Authorized("ROOT")
  @Mutation(() => Admin)
  async newAdmin(@Args() { adminName, password }: AdminInput) {
    const admin = await AdminModel.create({
      adminName,
      password: await AdminModel.hashPassword(password),
    });
    return admin;
  }

  @Authorized("ROOT")
  @Mutation(() => Boolean)
  async deleteAdmin(@Arg("_id", () => ID) _id: ObjectId) {
    const admin = await AdminModel.findByIdAndDelete(_id);
    return admin ? true : false;
  }
}
