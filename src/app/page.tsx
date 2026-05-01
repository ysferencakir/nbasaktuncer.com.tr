import Link from "next/link";

import { ArticleList } from "@/components/article/ArticleList";
import { Container } from "@/components/ui/Container";
import { fetchPublishedArticles } from "@/lib/queries/articles";

export default async function HomePage() {
  const allArticles = await fetchPublishedArticles();
  const latestArticles = allArticles.slice(0, 6);

  return (
    <Container className="space-y-10">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8">
        <p className="text-sm font-medium text-accent">Sanity-First Kurulum</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">İçeriği önce CMS’te üret, sitede anında yayınla.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
          Teknik bilgisi olmayan kullanıcıların rahatça makale girebilmesi için sade bir editör deneyimi ve modüler frontend
          altyapısı.
        </p>
        <div className="mt-6">
          <Link href="/articles" className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Tüm makaleler
          </Link>
        </div>
      </section>

      <ArticleList
        title="Son Makaleler"
        description="Yayın durumuna göre filtrelenmiş son içerikler listelenir."
        articles={latestArticles}
      />
    </Container>
  );
}
