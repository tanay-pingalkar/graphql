import { Request, Response } from "express";
import ioRedis from "ioredis";
export type MyContext = {
  req: Request & { session: { [key: string]: any } };
  res: Response;
  redisClient: ioRedis.Redis;
};
