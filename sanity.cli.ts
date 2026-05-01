import { defineCliConfig } from "sanity/cli";
import { getSanityPublicEnv } from "./src/lib/sanity/env";

const env = getSanityPublicEnv();

/**
 * `sanity` CLI komutları için. `.env` veya shell ortamında
 * NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET tanımlayın.
 */
export default defineCliConfig({
  api: {
    projectId: env.projectId,
    dataset: env.dataset,
  },
});
