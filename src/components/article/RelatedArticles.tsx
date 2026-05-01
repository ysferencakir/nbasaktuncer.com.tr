import Link from "next/link";

import { estimateReadingMinutes } from "@/lib/content-utils";
import type { ArticleListItem } from "@/types/sanity";

type RelatedArticlesProps = {
  articles: ArticleListItem[];
};

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-[#e7d8c6] bg-surface-card p-6">
      <h2 className="text-xl font-semibold tracking-tight text-ink">İlgili Yazılar</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug}`}
            className="rounded-xl border border-[#e2d3c1] bg-surface-muted p-4 transition hover:border-accent"
          >
            <p className="line-clamp-2 text-sm font-semibold leading-6 text-ink">{article.title}</p>
            <p className="mt-2 text-xs text-ink-subtle">
              {new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric" }).format(
                new Date(article.publishedAt),
              )}{" "}
              · {estimateReadingMinutes(`${article.title} ${article.excerpt}`)} dk
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
