import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article/ArticleList";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticlesByCategory } from "@/lib/queries/articles";
import { fetchCategoryBySlug } from "@/lib/queries/categories";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori bulunamadı",
      description: "İstenen kategori mevcut değil.",
    };
  }

  return {
    title: `${category.title} kategorisi`,
    description: `${category.title} kategorisindeki yayınlanmış makaleler.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, articles] = await Promise.all([fetchCategoryBySlug(slug), fetchPublishedArticlesByCategory(slug)]);

  if (!category) notFound();

  return (
    <Container>
      <ArticleList
        title={`${category.title} kategorisi`}
        description="Bu kategoriye ait yayınlanmış içerikler listeleniyor."
        articles={articles}
      />
    </Container>
  );
}
