export function estimateReadingMinutes(text: string, wordsPerMinute = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export function createSectionId(key: string | undefined): string {
  return `section-${key ?? "heading"}`;
}

type PortableChild = {
  _type?: string;
  text?: string;
};

type PortableHeadingBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: PortableChild[];
};

export type TocItem = {
  id: string;
  text: string;
  level: "h2" | "h3";
};

export function extractTocItems(
  body: Array<{ _type: string; [key: string]: unknown }> | null | undefined,
): TocItem[] {
  if (!body || body.length === 0) return [];

  const headings: TocItem[] = [];

  body.forEach((block) => {
    const b = block as PortableHeadingBlock;
    if (b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) return;
    if (!b._key) return;

    const text = (b.children ?? [])
      .filter((child) => child?._type === "span")
      .map((child) => child.text ?? "")
      .join("")
      .trim();

    if (!text) return;

    headings.push({
      id: createSectionId(b._key),
      text,
      level: b.style,
    });
  });

  return headings;
}
