import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { ArticleListItem } from "@/types/sanity";

type FeaturedArticleProps = {
  article: ArticleListItem;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const coverUrl = article.coverImage ? urlForImage(article.coverImage).width(1400).height(600).fit("crop").url() : null;

  if (coverUrl) {
    return (
      <section className="group relative overflow-hidden rounded-2xl">
        <Link href={`/articles/${article.slug}`} className="block">
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt ?? article.title}
            width={1400}
            height={600}
            className="h-[480px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 space-y-3 p-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Öne Çıkan Makale</p>
            <h1 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              {article.title}
            </h1>
            <p className="text-sm text-white/70">{formatDate(article.publishedAt)}</p>
            <p className="max-w-xl text-sm leading-7 text-white/80">{article.excerpt}</p>
            <span className="inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition group-hover:bg-accent-hover">
              Yazıyı Oku
            </span>
          </div>
        </Link>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7d8c6] bg-surface-card p-8 dark:border-[#352b1f]">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Öne Çıkan Makale</p>
      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
        <Link href={`/articles/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h1>
      <p className="mt-2 text-sm text-ink-subtle">{formatDate(article.publishedAt)}</p>
      <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted">{article.excerpt}</p>
      <div className="mt-5">
        <Link href={`/articles/${article.slug}`} className="inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">
          Yazıyı Oku
        </Link>
      </div>
    </section>
  );
}
