/**
 * Instagram token storage via Upstash Redis
 *
 * Reads and writes the Instagram long-lived access token from Redis so it
 * survives beyond the 60-day expiry window. The cron job at
 * /api/cron/refresh-instagram calls setInstagramToken() every 30 days.
 *
 * Bootstrap path (first deploy):
 *   - INSTAGRAM_ACCESS_TOKEN env var holds the initial token
 *   - getInstagramToken() falls back to that env var if Redis is empty
 *   - On first cron run: reads env var → refreshes → writes to Redis
 *   - From that point forward: Redis is the source of truth
 *
 * This means the env var only needs to be set once, ever.
 */

import { Redis } from "@upstash/redis";

const TOKEN_KEY = "instagram:access_token";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Get the current Instagram access token. Redis first, env var as fallback. */
export async function getInstagramToken(): Promise<string | null> {
  try {
    const redis = getRedis();
    if (redis) {
      const stored = await redis.get<string>(TOKEN_KEY);
      if (stored) return stored;
    }
  } catch (err) {
    console.warn("[token-store] Redis read failed, falling back to env var:", err);
  }
  // Fallback: initial setup before Redis is seeded, or if Redis is misconfigured
  return process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
}

/** Write a new Instagram access token to Redis. Called by the cron job. */
export async function setInstagramToken(token: string): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Upstash Redis not configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN");
  await redis.set(TOKEN_KEY, token);
}
