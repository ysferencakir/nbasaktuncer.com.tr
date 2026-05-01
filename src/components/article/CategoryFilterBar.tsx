import Link from "next/link";

type CategoryFilterItem = {
  _id: string;
  title: string;
  slug: string;
  articleCount: number;
};

type CategoryFilterBarProps = {
  categories: CategoryFilterItem[];
};

export function CategoryFilterBar({ categories }: CategoryFilterBarProps) {
  if (categories.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">Kategoriler</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/articles"
          className="rounded-full border border-[#d8c1a8] bg-surface-card px-3 py-1.5 text-sm font-medium text-ink hover:text-accent"
        >
          Tum Yazilar
        </Link>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category.slug}`}
            className="rounded-full border border-[#e2d3c1] bg-surface-muted px-3 py-1.5 text-sm text-ink-muted hover:text-accent"
          >
            {category.title} ({category.articleCount})
          </Link>
        ))}
      </div>
    </section>
  );
}
