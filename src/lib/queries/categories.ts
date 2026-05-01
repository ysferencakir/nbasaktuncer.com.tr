import type { CategoryRef } from "@/types/sanity";

import { getSanityClient } from "../sanity/client";

export const categoriesWithCountQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && status == "published" && references(^._id)])
  }
`;

export type CategoryWithCount = CategoryRef & { articleCount: number };

export async function fetchCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  return getSanityClient().fetch<CategoryWithCount[]>(categoriesWithCountQuery);
}

export async function fetchCategoryBySlug(slug: string): Promise<CategoryRef | null> {
  return getSanityClient().fetch<CategoryRef | null>(
    `*[_type == "category" && slug.current == $slug][0]{ _id, title, "slug": slug.current }`,
    { slug },
  );
}
