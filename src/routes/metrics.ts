import { Router } from "express";
import { db } from "../config/db";
import { redis } from "../config/redis";

const router = Router();

router.get("/metrics", async (_req, res) => {
  const checks = {
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: "unknown",
    redis: "unknown"
  };

  // DB check
  try {
    await db.query("SELECT 1");
    checks.database = "up";
  } catch {
    checks.database = "down";
  }

  // Redis check (optional)
  try {
    if (redis) {
      await redis.ping();
      checks.redis = "up";
    } else {
      checks.redis = "disabled";
    }
  } catch {
    checks.redis = "down";
  }

  return res.status(200).json({
    status: "success",
    service: "farmlokal-backend",
    ...checks
  });
});

export default router;
