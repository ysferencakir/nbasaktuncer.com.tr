import { ArticleCard } from "@/components/article/ArticleCard";
import type { ArticleListItem } from "@/types/sanity";

type ArticleListProps = {
  title: string;
  description?: string;
  articles: ArticleListItem[];
  emptyMessage?: string;
  searchTerm?: string;
};

export function ArticleList({
  title,
  description,
  articles,
  emptyMessage = "Henüz yayınlanmış makale bulunmuyor.",
  searchTerm,
}: ArticleListProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2 border-b border-[#e8dccf] pb-4 dark:border-[#352b1f]">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-ink">{title}</h1>
        {description ? <p className="max-w-measure text-sm leading-7 text-ink-muted">{description}</p> : null}
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#dcc8b3] bg-surface-card p-8 text-center text-ink-muted dark:border-[#352b1f]">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} searchTerm={searchTerm} />
          ))}
        </div>
      )}
    </section>
  );
}
