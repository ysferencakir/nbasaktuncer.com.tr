import type { TocItem } from "@/lib/content-utils";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-[#e7d8c6] bg-surface-card p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">İçindekiler</p>
      <nav className="mt-3">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === "h3" ? "pl-3" : ""}>
              <a href={`#${item.id}`} className="text-sm text-ink-muted hover:text-accent">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
