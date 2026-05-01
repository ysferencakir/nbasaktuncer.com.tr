import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article/ArticleList";
import { ArticleSearchBar } from "@/components/article/ArticleSearchBar";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticlesByCategoryAndSearch } from "@/lib/queries/articles";
import { fetchCategoryBySlug } from "@/lib/queries/categories";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
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

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { q } = await searchParams;
  const search = q?.trim() ?? "";

  const [category, articles] = await Promise.all([
    fetchCategoryBySlug(slug),
    fetchPublishedArticlesByCategoryAndSearch(slug, search),
  ]);

  if (!category) notFound();

  return (
    <Container className="space-y-8">
      <ArticleSearchBar defaultValue={search} action={`/category/${slug}`} />
      <ArticleList
        title={search ? `${category.title} kategorisinde arama` : `${category.title} kategorisi`}
        description={
          search
            ? "Arama sonucunda bu kategoride eslesen yayinlanmis icerikler listeleniyor."
            : "Bu kategoriye ait yayinlanmis icerikler listeleniyor."
        }
        articles={articles}
        emptyMessage={
          search
            ? `Bu kategoride aramanizla eslesen icerik bulunamadi.`
            : "Bu kategori icin yayinlanmis makale bulunmuyor."
        }
      />
    </Container>
  );
}
