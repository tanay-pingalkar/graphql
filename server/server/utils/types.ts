import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import ioRedis from "ioredis";
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: { [key: string]: any } };
  res: Response;
  redisClient: ioRedis.Redis;
};
