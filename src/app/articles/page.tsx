import type { Metadata } from "next";

import { ArticleList } from "@/components/article/ArticleList";
import { ArticleSearchBar } from "@/components/article/ArticleSearchBar";
import { CategoryFilterBar } from "@/components/article/CategoryFilterBar";
import { FeaturedArticle } from "@/components/article/FeaturedArticle";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticlesBySearch } from "@/lib/queries/articles";
import { fetchCategoriesWithCounts } from "@/lib/queries/categories";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Yayınlanan tüm makaleler ve kategoriler.",
};

type ArticlesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { q } = await searchParams;
  const search = q?.trim() ?? "";

  const [articles, categories] = await Promise.all([fetchPublishedArticlesBySearch(search), fetchCategoriesWithCounts()]);
  const featuredArticle = articles[0] ?? null;
  const remainingArticles = featuredArticle ? articles.slice(1) : [];
  const listItems = search ? articles : remainingArticles;

  return (
    <Container className="space-y-8">
      {!search && featuredArticle ? <FeaturedArticle article={featuredArticle} /> : null}
      <ArticleSearchBar defaultValue={search} />
      <CategoryFilterBar categories={categories.filter((category) => category.articleCount > 0)} />
      <ArticleList
        title={search ? `Arama Sonuçları: "${search}"` : "Tüm Makaleler"}
        description={
          search
            ? "Arama sonucunda eşleşen yayınlanmış makaleler listelenir."
            : "Yayınlanmış tüm içerikler bu sayfada listelenir."
        }
        articles={listItems}
        emptyMessage={
          search
            ? "Aramanızla eşleşen içerik bulunamadı. Farklı bir anahtar kelime ile tekrar deneyin."
            : "Henüz yayınlanmış makale bulunmuyor."
        }
      />
    </Container>
  );
}
