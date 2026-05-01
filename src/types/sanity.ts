import type { PortableTextBlock } from "@portabletext/types";

/** Sanity `image` alanı (asset + opsiyonel crop/hotspot) */
export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type AuthorRef = {
  _id: string;
  name: string;
  bio?: string;
  image?: SanityImage;
};

export type CategoryRef = {
  _id: string;
  title: string;
  slug: string;
};

export type ArticleListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: SanityImage;
  author?: AuthorRef | null;
  categories?: CategoryRef[] | null;
};

export type ArticleDetail = ArticleListItem & {
  /** Portable Text blokları (başlık, paragraf, görsel, …) */
  body?: Array<PortableTextBlock | { _type: string; [key: string]: unknown }> | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status?: "draft" | "published";
  featuredRank?: number | null;
};
