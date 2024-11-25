import Redis from "ioredis"
import { getRedisClient } from "./lib/redis"

 
const globalThisForRedis = globalThis as unknown as { redis: Redis }
 
export const redis = globalThisForRedis.redis || getRedisClient()
 
if (process.env.NODE_ENV !== "production") globalThisForRedis.redis = redis