import Link from "next/link";

import { estimateReadingMinutes } from "@/lib/content-utils";
import type { ArticleListItem } from "@/types/sanity";

type EditorsPickStripProps = {
  articles: ArticleListItem[];
};

export function EditorsPickStrip({ articles }: EditorsPickStripProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-[#e7d8c6] bg-surface-card p-6 dark:border-[#352b1f]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Editör Seçkisi</h2>
        <Link href="/articles" className="text-sm font-medium text-ink-muted hover:text-accent">
          Tümünü gör
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {articles.map((article, index) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug}`}
            className="rounded-xl border border-[#e2d3c1] bg-surface-muted px-4 py-3 transition hover:border-accent dark:border-[#352b1f]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-subtle">Seçki {index + 1}</p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-ink">{article.title}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-ink-subtle">
              <span>{new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short" }).format(new Date(article.publishedAt))}</span>
              <span>·</span>
              <span>{estimateReadingMinutes(`${article.title} ${article.excerpt}`)} dk</span>
              {article.categories?.[0] ? (
                <>
                  <span>·</span>
                  <span>{article.categories[0].title}</span>
                </>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
