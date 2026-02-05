import { Request, Response } from "express";
import { redis } from "../../config/redis";

export async function webhookHandler(req: Request, res: Response) {
  const eventId = req.headers["x-event-id"] as string;

  if (!eventId) {
    return res.status(400).send("Missing event id");
  }

  // ✅ If Redis is not available, process without idempotency
  if (!redis) {
    console.warn("⚠️ Redis unavailable, processing webhook without idempotency");
    console.log("Webhook data:", req.body);
    return res.status(200).send("Processed (no idempotency)");
  }

  const exists = await redis.get(`event:${eventId}`);
  if (exists) {
    return res.status(200).send("Duplicate ignored");
  }

  await redis.set(`event:${eventId}`, "processed", "EX", 3600);

  // process event
  console.log("Webhook data:", req.body);

  return res.status(200).send("Processed");
}
