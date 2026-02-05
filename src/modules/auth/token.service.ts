import { redis } from "../../config/reedis"
import { fetchOAuthToken } from "./auth.client";
import { acquireLock, releaseLock } from "../../utils/redisLock";

const TOKEN_KEY = "oauth:token";
const LOCK_KEY = "oauth:lock";

export async function getAccessToken(): Promise<string> {
  const cached = await redis.get(TOKEN_KEY);
  if (cached) return cached;

  const lock = await acquireLock(LOCK_KEY);
  if (!lock) {
    // wait briefly for other request to finish
    await new Promise(r => setTimeout(r, 100));
    return getAccessToken();
  }

  try {
    const { access_token, expires_in } = await fetchOAuthToken();

    // store token slightly less than expiry
    await redis.set(
      TOKEN_KEY,
      access_token,
      "EX",
      expires_in - 30
    );

    return access_token;
  } finally {
    await releaseLock(LOCK_KEY);
  }
}
