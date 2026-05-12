import Image from "next/image";
import Link from "next/link";

import { estimateReadingMinutes } from "@/lib/content-utils";
import { HighlightText } from "@/components/ui/HighlightText";
import { urlForImage } from "@/lib/sanity/image";
import type { ArticleListItem } from "@/types/sanity";

type ArticleCardProps = {
  article: ArticleListItem;
  searchTerm?: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export function ArticleCard({ article, searchTerm }: ArticleCardProps) {
  const coverUrl = article.coverImage ? urlForImage(article.coverImage).width(800).height(450).fit("crop").url() : null;
  const readingMinutes = estimateReadingMinutes(`${article.title} ${article.excerpt}`);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e7d8c6] bg-surface-card shadow-[0_2px_12px_rgba(66,42,20,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(66,42,20,0.10)] dark:border-[#352b1f] dark:shadow-none dark:hover:shadow-none">
      {coverUrl ? (
        <Link href={`/articles/${article.slug}`} className="block overflow-hidden">
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt ?? article.title}
            width={800}
            height={450}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      ) : (
        <div className="h-40 bg-gradient-to-br from-accent-soft to-surface-muted dark:from-[#3d2518] dark:to-[#1f1c15]" />
      )}
      <div className="space-y-3 p-6">
        <p className="text-xs font-medium text-ink-subtle">
          {formatDate(article.publishedAt)} · {readingMinutes} dk
        </p>
        <h2 className="font-serif text-xl font-semibold leading-tight">
          <Link href={`/articles/${article.slug}`} className="hover:text-accent">
            <HighlightText text={article.title} query={searchTerm} />
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-7 text-ink-muted">
          <HighlightText text={article.excerpt} query={searchTerm} />
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-ink-subtle">
          {article.categories?.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="rounded-full border border-[#e2d3c1] bg-surface-muted px-2.5 py-1 hover:text-accent dark:border-[#352b1f]"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
