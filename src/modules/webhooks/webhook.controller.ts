import { Request, Response } from "express";
import { redis } from "../../config/reedis";

export async function webhookHandler(req: Request, res: Response) {
  const eventId = req.headers["x-event-id"] as string;

  if (!eventId) return res.status(400).send("Missing event id");

  const exists = await redis.get(`event:${eventId}`);
  if (exists) {
    return res.status(200).send("Duplicate ignored");
  }

  await redis.set(`event:${eventId}`, "processed", "EX", 3600);

  // process event (async-safe)
  console.log("Webhook data:", req.body);

  res.status(200).send("Processed");
}
