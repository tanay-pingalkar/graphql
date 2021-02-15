import { Users } from "../entities/user";
import { MyContext } from "../utils/types";
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
import { ValidateEmail } from "../utils/validateEmail";
import { v4 } from "uuid";
import { FORGET_PASSWORD_KEY } from "../utils/helpers";
import { sendEmail } from "../utils/nodemailer";
@InputType()
class userInput {
  @Field()
  userName: string;

  @Field()
  userEmail: string;

  @Field()
  userPassword: string;
}
@InputType()
class loginInput {
  @Field()
  nameOrEmail: string;

  @Field()
  userPassword: string;
}
@ObjectType()
class Error {
  @Field(() => String)
  field: String;

  @Field(() => String)
  msg: String;
}

@ObjectType()
class userResponse {
  @Field(() => Error, { nullable: true })
  ErrorMsg?: Error;

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@Resolver()
export class UserResolver {
  @Mutation(() => userResponse)
  async createUser(
    @Arg("options") options: userInput,
    @Ctx() { em, req }: MyContext
  ): Promise<userResponse> {
    const hashedPassword = await argon2.hash(options.userPassword);
    if (!ValidateEmail(options.userEmail)) {
      return {
        ErrorMsg: {
          field: "email",
          msg: `${options.userEmail} is not a valid email`,
        },
      };
    }
    const user = em.create(Users, {
      userName: options.userName,
      userPassword: hashedPassword,
      userEmail: options.userEmail,
    });
    let res: userResponse = {};
    await em.persistAndFlush(user).catch((err) => {
      console.log(err);
      if (err.constraint === "users_user_email_unique") {
        res = {
          ErrorMsg: {
            field: "email",
            msg: `${options.userEmail} is already taken`,
          },
        };
      } else {
        res = {
          ErrorMsg: {
            field: "name",
            msg: `${options.userName} is already taken`,
          },
        };
      }
    });
    if (JSON.stringify(res) === "{}") {
      res = {
        user: user,
      };
      req.session!.userId = user.id;
    }

    return res;
  }

  @Mutation(() => userResponse)
  async loginUser(
    @Arg("options") options: loginInput,
    @Ctx() { em, req }: MyContext
  ): Promise<userResponse> {
    let user: Users;
    if (ValidateEmail(options.nameOrEmail)) {
      user = await em.findOne(Users, { userEmail: options.nameOrEmail });
    } else {
      user = await em.findOne(Users, { userName: options.nameOrEmail });
    }

    let res: userResponse;
    console.log(user);
    if (!user) {
      res = {
        ErrorMsg: {
          field: "nameOrEmail",
          msg: "user doesnt exist",
        },
      };
      return res;
    }
    const isValidate = await argon2.verify(
      user.userPassword,
      options.userPassword
    );
    console.log(isValidate);

    if (isValidate) {
      res = {
        user: user,
      };
      req.session!.userId = user.id;
    } else {
      res = {
        ErrorMsg: {
          field: "password",
          msg: "password is wrong",
        },
      };
    }
    return res;
  }

  @Query(() => Users, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<Users | null> {
    if (!req.session.userId) {
      return null;
    } else {
      return await em.findOne(Users, req.session.userId);
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((reso) =>
      req.session.destroy((err: any) => {
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

  @Mutation(() => Boolean)
  async forgetPassword(
    @Arg("email") email: string,
    @Ctx() { em, redisClient }: MyContext
  ): Promise<boolean> {
    const user = await em.findOne(Users, { userEmail: email });
    if (!user) {
      return false;
    }
    const token = v4();
    await redisClient.set(
      FORGET_PASSWORD_KEY + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24
    );
    await sendEmail(
      email,
      `<a href='http://localhost:3000/changePassword/${token}'>reset password</a>`
    );
    return true;
  }

  @Mutation(() => userResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { em, redisClient }: MyContext
  ): Promise<userResponse> {
    const userId = await redisClient.get(FORGET_PASSWORD_KEY + token);
    if (!userId) {
      return {
        msg: "error",
      };
    }
    let user = await em.findOne(Users, { id: parseInt(userId) });
    if (!user) {
      return {
        msg: "error",
      };
    }
    user.userPassword = await argon2.hash(newPassword);
    await em.persistAndFlush(user);
    return {
      msg: "password changed",
      user: user,
    };
  }
}
