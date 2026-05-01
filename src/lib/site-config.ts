export const defaultAuthorName = "Naciye Basak Tuncer";

export const studioPublicUrl = process.env.NEXT_PUBLIC_STUDIO_URL?.trim() || "/studio";

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}
