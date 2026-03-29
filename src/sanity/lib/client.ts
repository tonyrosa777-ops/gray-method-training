import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Returns a configured client, or null if projectId is not set.
 * All query helpers check for null, so pages build cleanly before Sanity is configured.
 */
export function getSanityClient(useCdn = false): SanityClient | null {
  if (!projectId) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn });
}
