import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { getSanityPublicEnv } from "./env";

/** Sanity `image` alanı veya asset referansı — URL üretimi için */
export function urlForImage(source: SanityImageSource) {
  const env = getSanityPublicEnv();
  return imageUrlBuilder({
    projectId: env.projectId,
    dataset: env.dataset,
  }).image(source);
}
