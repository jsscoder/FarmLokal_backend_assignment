import { redis } from "../config/redis"

export async function acquireLock(key: string, ttl = 5000) {
  return redis.set(key, "locked", "PX", ttl, "NX");
}

export async function releaseLock(key: string) {
  await redis.del(key);
}
