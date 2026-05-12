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
  const coverUrl = article.coverImage ? urlForImage(article.coverImage).width(1400).height(788).fit("crop").url() : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7d8c6] bg-surface-card shadow-[0_4px_16px_rgba(66,42,20,0.06)] dark:border-[#352b1f] dark:shadow-none">
      <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
        {coverUrl ? (
          <Link href={`/articles/${article.slug}`} className="block">
            <Image
              src={coverUrl}
              alt={article.coverImage?.alt ?? article.title}
              width={1400}
              height={788}
              className="h-full w-full object-cover"
              priority
            />
          </Link>
        ) : null}

        <div className="space-y-4 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Öne Çıkan Makale</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            <Link href={`/articles/${article.slug}`} className="hover:text-accent">
              {article.title}
            </Link>
          </h1>
          <p className="text-sm text-ink-subtle">{formatDate(article.publishedAt)}</p>
          <p className="text-sm leading-7 text-ink-muted">{article.excerpt}</p>

          <div className="pt-2">
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Yazıyı Oku
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
