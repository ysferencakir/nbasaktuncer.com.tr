import Link from "next/link";

import { EditorsPickStrip } from "@/components/article/EditorsPickStrip";
import { FeaturedArticle } from "@/components/article/FeaturedArticle";
import { ArticleList } from "@/components/article/ArticleList";
import { Container } from "@/components/ui/Container";
import { fetchEditorsPickArticles, fetchPublishedArticles } from "@/lib/queries/articles";

export const revalidate = 60;

export default async function HomePage() {
  const [allArticles, manualEditorsPick] = await Promise.all([fetchPublishedArticles(), fetchEditorsPickArticles()]);
  const featuredArticle = allArticles[0] ?? null;
  const editorsPickArticles =
    manualEditorsPick.length > 0 ? manualEditorsPick : featuredArticle ? allArticles.slice(1, 4) : allArticles.slice(0, 3);
  const latestArticles = featuredArticle ? allArticles.slice(1, 7) : allArticles.slice(0, 6);

  return (
    <Container className="space-y-10">
      {featuredArticle ? (
        <FeaturedArticle article={featuredArticle} />
      ) : (
        <section className="rounded-2xl border border-[#e7d8c6] bg-surface-card p-8 dark:border-[#352b1f]">
          <p className="text-sm font-medium text-accent">Sanity-First Kurulum</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">İçeriği önce CMS üzerinde üret, sitede anında yayınla.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
            Teknik bilgisi olmayan kullanıcıların rahatça makale girebilmesi için sade bir editör deneyimi ve modüler frontend
            altyapısı.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/articles" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">
              Tüm makaleler
            </Link>
            <Link href="/about" className="rounded-md border border-[#d8c1a8] px-4 py-2 text-sm font-medium text-ink hover:text-accent">
              Hakkında
            </Link>
          </div>
        </section>
      )}

      <EditorsPickStrip articles={editorsPickArticles} />

      <ArticleList
        title="Son Makaleler"
        description="Yayın durumuna göre filtrelenmiş son içerikler listelenir."
        articles={latestArticles}
      />
    </Container>
  );
}
