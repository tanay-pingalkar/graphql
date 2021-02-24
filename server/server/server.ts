import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { inProd, PORT } from "./utils/helpers";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Hello } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";

import ioRedis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./utils/types";
import cors from "cors";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { Post } from "./entities/post";
import { Users } from "./entities/user";
dotenv.config();

const RedisStore = connectRedis(session);
const redisClient = new ioRedis();

const main = async () => {
  console.log(process.env.DB_PASSWORD);
  const connection = await createConnection({
    type: "postgres",
    database: "allData",
    username: "postgres",
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Post, Users],
  });

  const app = express();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: inProd,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );
  //!cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redisClient,
    }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.listen(PORT, () => {
    console.log(`server is started on ${PORT}`);
  });
};

main();
