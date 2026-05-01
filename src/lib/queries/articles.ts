import type { ArticleDetail, ArticleListItem } from "@/types/sanity";

import { getSanityClient } from "../sanity/client";

export const articleListProjection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  author->{
    _id,
    name,
    bio,
    image
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`;

export const articleDetailProjection = `
  ${articleListProjection},
  body,
  seoTitle,
  seoDescription,
  status
`;

const publishedFilter = `_type == "article" && status == "published" && defined(slug.current)`;

export const publishedArticlesQuery = `
  *[${publishedFilter}] | order(publishedAt desc) {
    ${articleListProjection}
  }
`;

export const publishedArticlesByCategoryQuery = `
  *[${publishedFilter} && $slug in categories[]->slug.current] | order(publishedAt desc) {
    ${articleListProjection}
  }
`;

export const articleBySlugQuery = `
  *[${publishedFilter} && slug.current == $slug][0] {
    ${articleDetailProjection}
  }
`;

export async function fetchPublishedArticles(): Promise<ArticleListItem[]> {
  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesQuery);
}

export async function fetchPublishedArticlesByCategory(slug: string): Promise<ArticleListItem[]> {
  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesByCategoryQuery, { slug });
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return getSanityClient().fetch<ArticleDetail | null>(articleBySlugQuery, { slug });
}
