import type { Metadata } from "next";

import { ArticleList } from "@/components/article/ArticleList";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticles } from "@/lib/queries/articles";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Yayınlanan tüm makaleler.",
};

export default async function ArticlesPage() {
  const articles = await fetchPublishedArticles();

  return (
    <Container>
      <ArticleList title="Tüm Makaleler" description="Yayınlanmış tüm içerikler bu sayfada listelenir." articles={articles} />
    </Container>
  );
}
