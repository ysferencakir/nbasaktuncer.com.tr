import { createClient, type SanityClient } from "next-sanity";

import { getSanityPublicEnv } from "./env";

let cached: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (cached) return cached;
  const env = getSanityPublicEnv();
  cached = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: true,
  });
  return cached;
}
