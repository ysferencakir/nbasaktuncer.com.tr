export const defaultAuthorName = "Naciye Başak Tuncer";

export const studioPublicUrl = process.env.NEXT_PUBLIC_STUDIO_URL?.trim() || "/studio";
export const sitePublicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://nbasaktuncer.com.tr";

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
