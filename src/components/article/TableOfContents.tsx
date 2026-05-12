"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/content-utils";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headingNodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headingNodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.4, 0.8],
      },
    );

    headingNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-[#e7d8c6] bg-surface-card p-4 dark:border-[#352b1f]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">İçindekiler</p>
      <nav className="mt-3">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === "h3" ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                className={`text-sm hover:text-accent ${
                  activeId === item.id ? "font-semibold text-accent" : "text-ink-muted"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
