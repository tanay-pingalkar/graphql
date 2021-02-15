import { Post } from "./entities/post";
import { inProd } from "./utils/helpers";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Users } from "./entities/user";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, Users],
  dbName: "graphqldata",
  user: "postgres",
  password: "krutika24",
  debug: !inProd,
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
