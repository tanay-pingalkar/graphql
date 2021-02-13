import { User } from "../entities/user";
import { MyContext } from "server/types";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class userInput {
  @Field()
  userName: string;

  @Field()
  userPassword: string;
}

@ObjectType()
class userResponse {
  @Field(() => String, { nullable: true })
  msg?: String;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => userResponse)
  async createUser(
    @Arg("options") options: userInput,
    @Ctx() { em, req }: MyContext
  ): Promise<userResponse> {
    const hashedPassword = await argon2.hash(options.userPassword);
    const user = em.create(User, {
      userName: options.userName,
      userPassword: hashedPassword,
    });
    let res: userResponse = { msg: "und" };
    await em.persistAndFlush(user).catch((err) => {
      console.log(err);
      res = {
        msg: "error",
      };
    });
    if (res.msg === "und") {
      res = {
        msg: "validated",
        user: user,
      };
      req.session!.userId = user.id;
    }

    return res;
  }

  @Mutation(() => userResponse)
  async loginUser(
    @Arg("options") options: userInput,
    @Ctx() { em, req }: MyContext
  ): Promise<userResponse> {
    const user: User = await em.findOne(User, { userName: options.userName });
    let res: userResponse;
    console.log(user);
    if (!user) {
      res = { msg: "error" };
      return res;
    }
    const isValidate = await argon2.verify(
      user.userPassword,
      options.userPassword
    );
    console.log(isValidate);

    if (isValidate) {
      res = {
        msg: "validated",
        user: user,
      };
      req.session!.userId = user.id;
    } else {
      res = {
        msg: "error",
      };
    }
    return res;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    } else {
      return await em.findOne(User, req.session.userId);
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((reso) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          reso(false);
          return;
        }
        reso(true);
      })
    );
  }
}
