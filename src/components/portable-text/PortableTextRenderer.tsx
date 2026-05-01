import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { createSectionId } from "@/lib/content-utils";
import { urlForImage } from "@/lib/sanity/image";

type LinkMark = {
  href?: string;
  blank?: boolean;
};

type PortableTextRendererProps = {
  value: Array<PortableTextBlock | { _type: string; [key: string]: unknown }> | null | undefined;
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => <h1 id={createSectionId(value._key)} className="mt-8 text-3xl font-bold tracking-tight">{children}</h1>,
    h2: ({ children, value }) => <h2 id={createSectionId(value._key)} className="mt-8 text-2xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children, value }) => <h3 id={createSectionId(value._key)} className="mt-6 text-xl font-semibold">{children}</h3>,
    h4: ({ children, value }) => <h4 id={createSectionId(value._key)} className="mt-6 text-lg font-semibold">{children}</h4>,
    normal: ({ children }) => <p className="mt-4 leading-8 text-ink-muted">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-zinc-300 pl-4 italic text-ink-muted">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-muted">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const mark = value as LinkMark;
      if (!mark?.href) return <>{children}</>;

      const isExternal = mark.href.startsWith("http");
      return (
        <Link
          href={mark.href}
          target={mark.blank || isExternal ? "_blank" : undefined}
          rel={mark.blank || isExternal ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value).width(1200).fit("max").auto("format").url();
      const alt = (value as { alt?: string })?.alt ?? "Makale görseli";
      const caption = (value as { caption?: string })?.caption;

      return (
        <figure className="my-8">
          <Image src={src} alt={alt} width={1200} height={675} className="h-auto w-full rounded-xl border border-zinc-200" />
          {caption ? <figcaption className="mt-2 text-sm text-ink-subtle">{caption}</figcaption> : null}
        </figure>
      );
    },
    tipBox: ({ value }) => {
      const title = (value as { title?: string })?.title ?? "Ipucu";
      const text = (value as { text?: string })?.text ?? "";

      return (
        <aside className="my-7 rounded-xl border border-[#e2d3c1] bg-[#fff7ed] p-4">
          <p className="text-sm font-semibold text-ink">{title}</p>
          {text ? <p className="mt-2 text-sm leading-7 text-ink-muted">{text}</p> : null}
        </aside>
      );
    },
    quoteCard: ({ value }) => {
      const quote = (value as { quote?: string })?.quote ?? "";
      const source = (value as { source?: string })?.source;

      if (!quote) return null;

      return (
        <figure className="my-7 rounded-xl border border-[#e2d3c1] bg-surface-muted p-5">
          <blockquote className="text-base italic leading-8 text-ink">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {source ? <figcaption className="mt-2 text-sm text-ink-subtle">— {source}</figcaption> : null}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
