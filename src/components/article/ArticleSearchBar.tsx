type ArticleSearchBarProps = {
  defaultValue?: string;
};

export function ArticleSearchBar({ defaultValue = "" }: ArticleSearchBarProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-subtle">Arama</h2>
      <form action="/articles" method="get" className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Baslik veya ozet icinde ara..."
          className="w-full rounded-lg border border-[#dcc8b3] bg-surface-card px-3 py-2 text-sm text-ink outline-none ring-accent/30 transition focus:ring"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover sm:w-auto"
        >
          Ara
        </button>
      </form>
    </section>
  );
}
