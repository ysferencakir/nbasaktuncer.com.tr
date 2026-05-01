import Image from "next/image";
import Link from "next/link";

import { estimateReadingMinutes } from "@/lib/content-utils";
import { urlForImage } from "@/lib/sanity/image";
import type { ArticleListItem } from "@/types/sanity";

type ArticleCardProps = {
  article: ArticleListItem;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export function ArticleCard({ article }: ArticleCardProps) {
  const coverUrl = article.coverImage ? urlForImage(article.coverImage).width(800).height(450).fit("crop").url() : null;
  const readingMinutes = estimateReadingMinutes(`${article.title} ${article.excerpt}`);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e7d8c6] bg-surface-card shadow-[0_2px_12px_rgba(66,42,20,0.05)]">
      {coverUrl ? (
        <Link href={`/articles/${article.slug}`} className="block">
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt ?? article.title}
            width={800}
            height={450}
            className="h-auto w-full object-cover"
          />
        </Link>
      ) : null}
      <div className="space-y-3 p-6">
        <p className="text-xs font-medium text-ink-subtle">
          {formatDate(article.publishedAt)} · {readingMinutes} dk
        </p>
        <h2 className="text-xl font-semibold leading-tight">
          <Link href={`/articles/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-7 text-ink-muted">{article.excerpt}</p>
        <div className="flex flex-wrap gap-2 text-xs text-ink-subtle">
          {article.categories?.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="rounded-full border border-[#e2d3c1] bg-surface-muted px-2.5 py-1 hover:text-accent"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
