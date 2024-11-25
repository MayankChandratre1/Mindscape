import Redis from "ioredis"
import { handleError } from "../utils/error.util";

export const getRedisClient = () => {
  const REDIS_URL = process.env.REDIS_URL
  try{
    if(!REDIS_URL){
      throw Error("No REDIS_URL found in environment")
    }
    const client = new Redis(REDIS_URL);
    return client
  }catch(err){
    handleError("REDIS")
    return null
  }
}

