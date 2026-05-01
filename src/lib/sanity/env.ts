const REQUIRED = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
] as const;

export type SanityPublicEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

/**
 * Sanity public env değişkenlerini okur. Eksikse anlaşılır hata fırlatır (build / runtime).
 */
export function getSanityPublicEnv(): SanityPublicEnv {
  const missing: string[] = [];

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim();

  if (!projectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!dataset) missing.push("NEXT_PUBLIC_SANITY_DATASET");
  if (!apiVersion) missing.push("NEXT_PUBLIC_SANITY_API_VERSION");

  if (missing.length > 0) {
    throw new Error(
      `[Sanity] Ortam değişkenleri eksik: ${missing.join(", ")}. ` +
        `Kök dizinde .env.local oluşturun veya Vercel Project Settings > Environment Variables bölümünde tanımlayın. ` +
        `Örnek için .env.local.example dosyasına bakın. Gerekli anahtarlar: ${REQUIRED.join(", ")}.`,
    );
  }

  const safeProjectId = projectId as string;
  const safeDataset = dataset as string;
  const safeApiVersion = apiVersion as string;

  return { projectId: safeProjectId, dataset: safeDataset, apiVersion: safeApiVersion };
}
