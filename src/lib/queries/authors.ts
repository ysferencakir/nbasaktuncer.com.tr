import type { AuthorRef } from "@/types/sanity";

import { getSanityClient } from "../sanity/client";

export const authorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    bio,
    image
  }
`;

export async function fetchAuthors(): Promise<AuthorRef[]> {
  return getSanityClient().fetch<AuthorRef[]>(authorsQuery);
}
