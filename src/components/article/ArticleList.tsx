import { ArticleCard } from "@/components/article/ArticleCard";
import type { ArticleListItem } from "@/types/sanity";

type ArticleListProps = {
  title: string;
  description?: string;
  articles: ArticleListItem[];
};

export function ArticleList({ title, description, articles }: ArticleListProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
        {description ? <p className="max-w-measure text-sm leading-7 text-ink-muted">{description}</p> : null}
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-ink-muted">
          Henüz yayınlanmış makale bulunmuyor.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
