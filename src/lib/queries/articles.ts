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

export const editorsPickArticlesQuery = `
  *[
    ${publishedFilter} &&
    defined(featuredRank)
  ] | order(featuredRank asc, publishedAt desc)[0...3] {
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

export const publishedArticlesBySearchQuery = `
  *[
    ${publishedFilter} &&
    (
      title match $searchPattern ||
      excerpt match $searchPattern
    )
  ] | order(publishedAt desc) {
    ${articleListProjection}
  }
`;

export const publishedArticlesByCategoryAndSearchQuery = `
  *[
    ${publishedFilter} &&
    $slug in categories[]->slug.current &&
    (
      title match $searchPattern ||
      excerpt match $searchPattern
    )
  ] | order(publishedAt desc) {
    ${articleListProjection}
  }
`;

export const relatedArticlesByCategoryQuery = `
  *[
    ${publishedFilter} &&
    _id != $excludeId &&
    count((categories[]->slug.current)[@ in $categorySlugs]) > 0
  ] | order(publishedAt desc)[0...$limit] {
    ${articleListProjection}
  }
`;

export const latestArticlesExcludingCurrentQuery = `
  *[
    ${publishedFilter} &&
    _id != $excludeId
  ] | order(publishedAt desc)[0...$limit] {
    ${articleListProjection}
  }
`;

export const articleNavigationItemsQuery = `
  *[${publishedFilter}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`;

export async function fetchPublishedArticles(): Promise<ArticleListItem[]> {
  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesQuery);
}

export async function fetchEditorsPickArticles(): Promise<ArticleListItem[]> {
  return getSanityClient().fetch<ArticleListItem[]>(editorsPickArticlesQuery);
}

export async function fetchPublishedArticlesByCategory(slug: string): Promise<ArticleListItem[]> {
  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesByCategoryQuery, { slug });
}

export async function fetchPublishedArticlesBySearch(search: string): Promise<ArticleListItem[]> {
  const normalized = search.trim();
  if (!normalized) return fetchPublishedArticles();

  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesBySearchQuery, {
    searchPattern: `*${normalized}*`,
  });
}

export async function fetchPublishedArticlesByCategoryAndSearch(
  slug: string,
  search: string,
): Promise<ArticleListItem[]> {
  const normalized = search.trim();
  if (!normalized) return fetchPublishedArticlesByCategory(slug);

  return getSanityClient().fetch<ArticleListItem[]>(publishedArticlesByCategoryAndSearchQuery, {
    slug,
    searchPattern: `*${normalized}*`,
  });
}

export async function fetchRelatedArticles(
  excludeId: string,
  categorySlugs: string[],
  limit = 3,
): Promise<ArticleListItem[]> {
  if (categorySlugs.length === 0) {
    return getSanityClient().fetch<ArticleListItem[]>(latestArticlesExcludingCurrentQuery, { excludeId, limit });
  }

  return getSanityClient().fetch<ArticleListItem[]>(relatedArticlesByCategoryQuery, {
    excludeId,
    categorySlugs,
    limit,
  });
}

export async function fetchAdjacentArticlesBySlug(
  slug: string,
): Promise<{ newer: ArticleListItem | null; older: ArticleListItem | null }> {
  const ordered = await getSanityClient().fetch<ArticleListItem[]>(articleNavigationItemsQuery);
  const index = ordered.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { newer: null, older: null };
  }

  const newer = index > 0 ? ordered[index - 1] : null;
  const older = index < ordered.length - 1 ? ordered[index + 1] : null;

  return { newer, older };
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return getSanityClient().fetch<ArticleDetail | null>(articleBySlugQuery, { slug });
}
