import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { User, UserModel } from "./user.dto";
import { NewUserInput, UsersFilter } from "./user.types";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(
    @Arg("filter", { nullable: true })
    filter: UsersFilter
  ) {
    if (filter)
      var {
        limit,
        offset,
        role,
        emailVerified,
        mobileVerified,
        active,
        sortBy,
        sort,
      } = filter;
    //return await UserModel.find();
    return await UserModel.find({
      role: role ?? ["ADMIN", "DOCTOR", "PATIENT"],
      emailVerified: emailVerified ?? [true, false],
      mobileVerified: mobileVerified ?? [true, false],
      active: active ?? [true, false],
    })
      .sort({ [sortBy ?? "createdAt"]: sort ?? "asc" })
      .skip(offset ?? 0)
      .limit(limit ?? 50);
  }

  @Mutation(() => User)
  async newUser(@Arg("data") newUserData: NewUserInput) {
    const user = await UserModel.create({ ...newUserData });
    return user;
  }
}
