import Redis from "ioredis";

export const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      tls: {} // required for Upstash
    })
  : null;

if (redis) {
  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("⚠️ Redis error:", err.message);
  });
}
