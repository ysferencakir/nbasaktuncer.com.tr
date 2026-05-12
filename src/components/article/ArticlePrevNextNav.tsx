import Link from "next/link";

import type { ArticleListItem } from "@/types/sanity";

type ArticlePrevNextNavProps = {
  newer: ArticleListItem | null;
  older: ArticleListItem | null;
};

function NavCard({
  label,
  article,
}: {
  label: string;
  article: ArticleListItem | null;
}) {
  if (!article) {
    return (
      <div className="rounded-xl border border-dashed border-[#dcc8b3] bg-surface-card p-4 text-sm text-ink-subtle dark:border-[#352b1f]">
        {label}: bulunamadı
      </div>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="rounded-xl border border-[#e2d3c1] bg-surface-card p-4 hover:border-accent dark:border-[#352b1f]">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-subtle">{label}</p>
      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-ink">{article.title}</p>
    </Link>
  );
}

export function ArticlePrevNextNav({ newer, older }: ArticlePrevNextNavProps) {
  if (!newer && !older) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-[#e7d8c6] bg-surface-card p-6 dark:border-[#352b1f]">
      <h2 className="text-xl font-semibold tracking-tight text-ink">Sonraki Okuma</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <NavCard label="Daha yeni yazı" article={newer} />
        <NavCard label="Daha eski yazı" article={older} />
      </div>
    </section>
  );
}
