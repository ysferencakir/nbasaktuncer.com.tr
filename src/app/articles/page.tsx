import type { Metadata } from "next";

import { ArticleList } from "@/components/article/ArticleList";
import { CategoryFilterBar } from "@/components/article/CategoryFilterBar";
import { FeaturedArticle } from "@/components/article/FeaturedArticle";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticles } from "@/lib/queries/articles";
import { fetchCategoriesWithCounts } from "@/lib/queries/categories";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Yayinlanan tum makaleler ve kategoriler.",
};

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([fetchPublishedArticles(), fetchCategoriesWithCounts()]);
  const featuredArticle = articles[0] ?? null;
  const remainingArticles = featuredArticle ? articles.slice(1) : articles;

  return (
    <Container className="space-y-8">
      {featuredArticle ? <FeaturedArticle article={featuredArticle} /> : null}
      <CategoryFilterBar categories={categories.filter((category) => category.articleCount > 0)} />
      <ArticleList
        title="Tum Makaleler"
        description="Yayinlanmis tum icerikler bu sayfada listelenir."
        articles={remainingArticles}
      />
    </Container>
  );
}
